const db = require('./postgres')

/*
select code from rating_codes where id=19
*/
const getStoryRating = async (ratingId) => {
  console.log('publishingModel.getStoryRating')
  const SELECT = 'select code from rating_codes where id=$1'
  const dbResult = await db.query(SELECT, [ratingId])
  return dbResult.rows[0].code
}

/*
select genre_codes.code from genre_codes, catalog_genre, catalog
where catalog.draft_id='v7kv89xo'
and catalog.id=catalog_genre.catalog_id
and catalog_genre.genre_id=genre_codes.id;
 */
const getStoryGenre = async (draftId, version) => {
  console.log('publishingModel.getStoryGenre')
  const SELECT = 'select genre_codes.code as code from genre_codes, catalog_genre, catalog '
    + 'where catalog.draft_id=$1 and catalog.version=$2 '
    + 'and catalog.id=catalog_genre.catalog_id and catalog_genre.genre_id=genre_codes.id'
  const dbResult = await db.query(SELECT, [draftId, version])
  if (dbResult.rowCount) {
    return dbResult.rows.map(row => row.code)
  } else {
    return []
  }
}

const patchEdition = async (metadata) => {
  console.log('publishingModel.patchEdition')
  if (metadata.rating) {
    const ratingCode = await getStoryRating(metadata.rating)
    metadata['rating'] = ratingCode
  }
  // merge in associated genres
  const genre = await getStoryGenre(metadata.draftId, metadata.version)
  metadata['genre'] = genre
  return metadata
}

const mapCatalogRowToApi = async (catalogRow) => {
  const metadata = {
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
  return await patchEdition(metadata)
}

/*
select version from catalog where draft_id='abcdefg' and published_at is null;
*/
exports.findUnpublishedVersion = async (draftId) => {
  console.log('publishingModel.findUnpublishedVersion')
  const SEL_STORY = 'select version from catalog where draft_id=$1 and published_at is null'
  const dbResult = await db.query(SEL_STORY, [draftId])
  if (dbResult.rowCount > 0) {
    return dbResult.rows[0].version
  } else {
    return false
  }
}

/*
select version from catalog
where draft_id='979jafrz' and published_at is not null
order by published_at desc nulls last limit 1;
*/
exports.getLatestPublishedVersion = async (draftId) => {
  console.log('publishingModel.getLatestPublishedVersion')
  const SELECT = 'select version from catalog '
    + 'where draft_id=$1 and published_at is not null '
    + 'order by published_at desc nulls last limit 1'
  const dbResult = await db.query(SELECT, [draftId])
  if (dbResult.rowCount) {
    return dbResult.rows[0].version
  }
}

/*
select * from catalog where draft_id='abcde'
*/
exports.getEditions = async (draftId) => {
  console.log('publishingModel.getEditions')
  let result
  try {
    const SEL_STORY = 'select * from catalog WHERE draft_id=$1'
    const dbResult = await db.query(SEL_STORY, [draftId])
    result = await Promise.all(dbResult.rows.map(row => mapCatalogRowToApi(row)))
  } catch (err) {
    console.error(err)
  }
  return result
}

/*
insert into catalog
(draft_id, version, story_key, author_id, pen_name, title, tag_line, about, first_scene_id)
select story.id, '1', story.id, author_id, player.pen_name, title, tag_line, about, first_scene_id
from story, player
where story.id='979jafrz';
*/
exports.createNewEdition = async (draftId, version) => {
  console.log('publishingModel.createNewEdition')
  const INSERT = 'INSERT INTO catalog '
    + '(draft_id, version, story_key, author_id, pen_name, title, tag_line, about, first_scene_id) '
    + 'select story.id, $2, story.id, author_id, player.pen_name, title, tag_line, about, first_scene_id '
    + 'from story, player where story.id=$1 and player.id=story.author_id '
    + 'returning *'
  let dbResult = await db.query(INSERT, [draftId, version])
  return await mapCatalogRowToApi(dbResult.rows[0])
}

exports.getEdition = async (draftId, version) => {
  console.log('publishingModel.getEdition')
  let result
  const SEL_STORY = 'SELECT * FROM catalog WHERE draft_id=$1 and version=$2'
  const dbResult = await db.query(SEL_STORY, [draftId, version])
  if (dbResult.rowCount === 1) {
    result = await mapCatalogRowToApi(dbResult.rows[0])
  }
  return result
}

/*
insert into catalog_genre (catalog_id, genre_id)
select catalog.id, genre_codes.id from catalog, genre_codes
where catalog.draft_id='v7kv89xo' and catalog.version='1' and genre_codes.code='mystery';
*/
const assignGenre = async (draftId, version, code) => {
  console.log('publishingModel.assignGenre')
  const INSERT = 'insert into catalog_genre (catalog_id, genre_id) '
    + 'select catalog.id, genre_codes.id from catalog, genre_codes '
    + 'where catalog.draft_id=$1 and catalog.version=$2 and genre_codes.code=$3'
  try {
    const dbResult = await db.query(INSERT, [draftId, version, code])
    return await mapCatalogRowToApi(dbResult.rows[0])
  } catch (error) {
    // want to swallow dupes -- or only insert if not found
    console.log(error)
  }
}

/*
delete from catalog_genre
where catalog_id=(select id from catalog where draft_id='v7kv89xo' and version='0-1')
and genre_id=(select id from genre where code='mystery');
*/
const unassignGenre = async (draftId, version, code) => {
  console.log('publishingModel.unassignGenre')
  const DELETE = 'delete from catalog_genre '
    + 'where catalog_id=(select id from catalog where draft_id=$1 and version=$2) '
    + 'and genre_id=(select id from genre_codes where code=$3)'
  const dbResult = await db.query(DELETE, [draftId, version, code])
}

/*
update catalog
set story_key='wumpus', pen_name='wumpus', title='wumpus', tag_line='wumpus', about='wumpus',
rating=(select id from rating_codes where code=='Y')
where draft_id='v7kv89xo' and version='0-1';
*/
exports.updateEdition = async (draftId, version, metadataUpdate) => {
  console.log('publishingModel.updateEdition')
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
    updates = updates.concat(`, rating=(select id from rating_codes where code=$${args.length})`)
  }

  // skip if no args added
  if (args.length > 2) {
    updates = updates.substring(2)
    const UPDATE = `update catalog set ${updates} where draft_id=$1 and version=$2`
    dbResult = await db.query(UPDATE, args)
  }

  // take care of genre changes
  if (metadataUpdate.genre) {
    const currentGenreList = await getStoryGenre(draftId, version)
    if (metadataUpdate.genre.toAssign) {
      metadataUpdate.genre.toAssign.forEach(code => {
        if (!currentGenreList.includes(code)) {
          console.log('Assigning', code)
          assignGenre(draftId, version, code)
        }
      })
    }
    if (metadataUpdate.genre.toUnassign) {
      metadataUpdate.genre.toUnassign.forEach(code => {
        if (currentGenreList.includes(code)) {
          console.log('Unassigning', code)
          unassignGenre(draftId, version, code)
        }
      })
    }
  }
}

/*
update catalog set published_filename='979jafrz_0-1.json', published_at=current_timestamp
where draft_id='979jafrz' and version='0-1';
*/
exports.finishPublishing = async (draftId, version, filename) => {
  console.log('publishingModel.removeGenre')
  const UPDATE = 'update catalog set published_filename=$3, published_at=current_timestamp '
    + 'where draft_id=$1 and version=$2'
  const dbResult = await db.query(UPDATE, [draftId, version, filename])
}
