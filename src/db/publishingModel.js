const db = require('./postgres')

const mapCatalogRowToApi = (catalogRow) => {
  return {
    draftId: catalogRow.draft_id,
    version: catalogRow.version,
    storyKey: catalogRow.story_key,
    authorId: catalogRow.author_id,
    penName: catalogRow.pen_name,
    title: catalogRow.title,
    tagLine: catalogRow.tag_line,
    about: catalogRow.about,
    rating: catalogRow.rating,
    firstSceneId: catalogRow.first_scene_id,
    publishedAt: catalogRow.published_at
  }
}

const mapGenreRowsToArray = (genreRows) => {
  genreRows.forEach(row => {
    console.log(row)
  })
  return genreRows.map(row => row.code)
}

/*
select draft_id, version, story_key, author_id, pen_name, title, tag_line, about, rating.code
from catalog, rating
where catalog.author_id=$1 and draft_id=$2 and rating.id=catalog.rating;

select * from catalog, story
where story.author_id=''
and story.id=''
and catalog.draft_id=story.id
and catalog.published_at is null;
*/
exports.findUnpublishedInCatalog = async (playerId, draftId) => {
  console.log('publishingModel.findUnpublishedInCatalog')
  const SEL_STORY = 'SELECT * FROM catalog WHERE author_id=$1 AND draft_id=$2 AND published_at IS NULL'
  const dbResult = await db.query(SEL_STORY, [playerId, draftId])
  if (dbResult.rowCount === 1) {
    return mapCatalogRowToApi(dbResult.rows[0])
  } else {
    return null
  }
}

/*
insert into catalog
(draft_id, version, story_key, author_id, pen_name, title, tag_line, about, first_scene_id)
select story.id, '0.1', story.id, author_id, player.pen_name, title, tag_line, about, first_scene_id
from story, player
where story.id='979jafrz';
*/
exports.createCatalogRecord = async (draftId, version) => {
  console.log('publishingModel.createCatalogRecord')
  const INSERT = 'INSERT INTO catalog '
    + '(draft_id, version, story_key, author_id, pen_name, title, tag_line, about, first_scene_id) '
    + 'select story.id, $2, story.id, author_id, player.pen_name, title, tag_line, about, first_scene_id '
    + 'from story, player where story.id=$1 and player.id=story.author_id '
    + 'returning *'
  let dbResult = await db.query(INSERT, [draftId, version])
  return mapCatalogRowToApi(dbResult.rows[0])
}

exports.getStoryFromCatalog = async (draftId, version) => {
  console.log('publishingModel.getStoryFromCatalog')
  const SEL_STORY = 'SELECT * FROM catalog WHERE draft_id=$1 and version=$2'
  const dbResult = await db.query(SEL_STORY, [draftId, version])
  if (dbResult.rowCount === 1) {
    return mapCatalogRowToApi(dbResult.rows[0])
  } else {
    return null
  }
}

/*
select genre.code from genre, catalog_genre, catalog
where catalog.draft_id='v7kv89xo'
and catalog.id=catalog_genre.catalog_id
and catalog_genre.genre_id=genre.id;
 */
exports.getStoryGenre = async (draftId, version) => {
  console.log('publishingModel.getStoryGenre')
  const SELECT = 'select genre.code as code from genre, catalog_genre, catalog '
    + 'where catalog.draft_id=$1 and catalog.version=$2 '
    + 'and catalog.id=catalog_genre.catalog_id and catalog_genre.genre_id=genre.id'
  const dbResult = await db.query(SELECT, [draftId, version])
  if (dbResult.rowCount) {
    return mapGenreRowsToArray(dbResult.rows)
  } else {
    return []
  }
}

exports.getRatingCode = async (ratingId) => {
  console.log('publishingModel.getRatingCode')
  const SELECT = 'select code from rating where id=$1'
  const dbResult = await db.query(SELECT, [ratingId])
  return dbResult.rows[0].code
}

/*
insert into catalog_genre (catalog_id, genre_id)
select catalog.id, genre.id from catalog, genre
where catalog.draft_id='v7kv89xo' and genre.code='mystery';
*/
const assignGenre = async (draftId, version, genreToAssign) => {
  console.log('publishingModel.assignGenre')
  const INSERT = 'insert into catalog_genre (catalog_id, genre_id) '
    + 'select catalog.id, genre.id from catalog, genre '
    + 'where catalog.draft_id=$1 and genre.code=$2'
  try {
    const dbResult = await db.query(INSERT, [draftId, genreToAssign])
  } catch (error) {
    // want to swallow dupes -- or only insert if not found
    console.log(error)
  }
}

const removeGenre = async (draft, version, genreCodes) => {

}

/*
update catalog
set story_key='wumpus', pen_name='wumpus', title='wumpus', tag_line='wumpus', about='wumpus',
rating=(select id from rating where code=='Y')
where draft_id='v7kv89xo' and version='0-1';
*/
exports.updateCatalogRecord = async (draftId, version, metadataUpdate) => {
  console.log('publishingModel.updateCatalogRecord')
  let updates = ''
  const args = [draftId, version]
  if (metadataUpdate.storyKey) {
    args.push(metadataUpdate.storyKey)
    updates = updates.concat(`, story_key=$${args.length}`)
  }
  if (metadataUpdate.penName) {
    args.push(metadataUpdate.penName)
    updates = updates.concat(`, pen_name=$${args.length}`)
  }
  if (metadataUpdate.title) {
    args.push(metadataUpdate.title)
    updates = updates.concat(`, title=$${args.length}`)
  }
  if (metadataUpdate.tagLine) {
    args.push(metadataUpdate.tagLine)
    updates = updates.concat(`, tag_line=$${args.length}`)
  }
  if (metadataUpdate.about) {
    args.push(metadataUpdate.about)
    updates = updates.concat(`, about=$${args.length}`)
  }
  if (metadataUpdate.rating) {
    args.push(metadataUpdate.rating)
    updates = updates.concat(`, rating=(select id from rating where code=$${args.length})`)
  }

  // skip if no args added
  if (args.length > 2) {
    updates = updates.substring(2)
    const UPDATE = `update catalog set ${updates} where draft_id=$1 and version=$2`
    dbResult = await db.query(UPDATE, args)
  }

  // determine if they are different
  if (metadataUpdate.genre) {
    const currentGenre = getStoryGenre(draftId, versionId)
    const diff = {
      count: 0,
      add: [],
      remove: []
    }
    const different = currentGenre.length != metadataUpdate.genre.length
      ||
    assignGenre(draftId, version, metadataUpdate.genre)
  }
}