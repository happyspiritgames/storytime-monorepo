const db = require('./postgres')

const mapCatalogRowToApi = (catalogRow) => {
  return {
    draftId: catalogRow.draft_id,
    version: catalogRow.version,
    storyKey: catalogRow.storyKey,
    author: catalogRow.authorId,
    penName: catalogRow.pen_name,
    title: catalogRow.title,
    tagLine: catalogRow.tag_line,
    about: catalogRow.about,
    rating: catalogRow.rating,
    firstSceneId: catalogRow.firstSceneId,
    publishedAt: catalogRow.published_at
  }
}

/*
select * from catalog, story
where story.author_id=''
and story.id=''
and catalog.draft_id=story.id
and catalog.published_at is null
*/
exports.findUnpublishedInCatalog = async (playerId, draftId) => {
  console.log('publishingModel.findUnpublishedInCatalog')
  const SEL_STORY = 'SELECT * FROM catalog WHERE author_id=$1 AND draft_id=$2 AND published_at IS NULL'
  const dbResult = await db.query(SEL_STORY, [playerId, draftId])
  console.log('catalog record', dbResult.rows[0])
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
  const draftId = metadata.draftId
  if (!draftId) {
    return false
  }
  const INSERT = 'INSERT INTO catalog '
    + '(draft_id, version, story_key, author_id, pen_name, title, tag_line, about, first_scene_id) '
    + 'select story.id, $2, story.id, author_id, player.pen_name, title, tag_line, about, first_scene_id '
    + 'from story, player where story.id=$1'
  let dbResult = await db.query(INSERT, [storyId, version])
  if (dbResult.rowCount !== 1) {
    console.error('Did not create record in catalog')
    return
  }
  console.log('result', dbResult.rows[0])
  return dbResult.rows[0]
}
