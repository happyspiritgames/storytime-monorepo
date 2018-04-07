const db = require('./postgres')

/*
select code from rating_codes where id=19
*/
const getStoryRating = async (ratingId) => {
  console.log('publishingModel.getStoryRating')
  const QUERY = 'select code from rating_codes where id=$1'
  const dbResult = await db.query(QUERY, [ratingId])
  return dbResult.rows[0].code
}

/*
select genre_codes.code as code from genre_codes, edition_genre, edition
where edition.edition_key='v7kv89xo-1'
and edition.id=edition_genre.edition_id and edition_genre.genre_id=genre_codes.id;
 */
const getStoryGenre = async (editionKey) => {
  console.log('publishingModel.getStoryGenre')
  const QUERY = 'select genre_codes.code as code from genre_codes, edition_genre, edition '
    + 'where edition.edition_key=$1 '
    + 'and edition.id=edition_genre.edition_id and edition_genre.genre_id=genre_codes.id'
  const dbResult = await db.query(QUERY, [editionKey])
  if (dbResult.rowCount) {
    return dbResult.rows.map(row => row.code)
  } else {
    return []
  }
}

/**
 * Turn primary keys into codes. Tack on genre codes.
 */
const patchEdition = async (editionToPatch) => {
  console.log('publishingModel.patchEdition')
  if (editionToPatch.rating) {
    const ratingCode = await getStoryRating(editionToPatch.rating)
    editionToPatch['rating'] = ratingCode
  }
  // merge in associated genres
  const genre = await getStoryGenre(editionToPatch.editionKey)
  console.log('patching genre with', genre)
  editionToPatch['genre'] = genre
  return editionToPatch
}

/**
 * Turns edition row from database into form expected by StoryTime authoring API.
 * 
 * @param {*} editionRow
 */
const mapEditionRowToApi = async (editionRow) => {
  const roughEdition = {
    editionKey: editionRow.edition_key,
    storyId: editionRow.story_id,
    version: editionRow.version,
    summary: editionRow.summary,
    rating: editionRow.rating,
    publishedAt: editionRow.published_at
  }
  return await patchEdition(roughEdition)
}

/*
select version from edition where story_id='abcdefg' and published_at is null;
*/
exports.findUnpublishedVersion = async (storyId) => {
  console.log('publishingModel.findUnpublishedVersion')
  const QUERY = 'select version from edition where story_id=$1 and published_at is null'
  const dbResult = await db.query(QUERY, [storyId])
  if (dbResult.rowCount > 0) {
    return dbResult.rows[0].version
  } else {
    return false
  }
}

/*
select version from edition
where story_id='979jafrz' and published_at is not null
order by published_at desc nulls last limit 1;
*/
exports.getLatestPublishedVersion = async (storyId) => {
  console.log('publishingModel.getLatestPublishedVersion')
  const QUERY = 'select version from edition '
    + 'where story_id=$1 and published_at is not null '
    + 'order by published_at desc nulls last limit 1'
  const dbResult = await db.query(QUERY, [storyId])
  if (dbResult.rowCount) {
    return dbResult.rows[0].version
  }
}

/*
select * from edition where story_id='abcde'
*/
exports.getEditions = async (storyId) => {
  console.log('publishingModel.getEditions')
  let result
  try {
    const QUERY = 'select * from edition where story_id=$1'
    const dbResult = await db.query(QUERY, [storyId])
    result = await Promise.all(dbResult.rows.map(row => mapEditionRowToApi(row)))
  } catch (err) {
    console.error(err)
  }
  return result
}

/*
select story.id, title, pen_name, tag_line, about, first_scene_id from story, player
where story.id='v7kv89xo' and story.author_id=player.id

insert into edition
(edition_key, story_id, version, summary)
values ('v7kv89xo-1', 'v7kv89xo', '1', 'serialized-json-doc')
returning *;
*/
exports.createNewEdition = async (storyId, version) => {
  console.log('publishingModel.createNewEdition')

  // summary
  const SELECT_SUMMARY = 'select story.id, title, pen_name, tag_line, about, first_scene_id '
    + 'from story, player '
    + 'where story.id=$1 and story.author_id=player.id'
  let dbResult = await db.query(SELECT_SUMMARY, [storyId])
  const summary = JSON.stringify(dbResult.rows[0])

  const editionKey = `${storyId}-${version}`
  const INSERT_EDITION = 'insert into edition '
    + '(edition_key, story_id, version, summary) '
    + 'values ($1, $2, $3, $4) '
    + 'returning * '
  dbResult = await db.query(INSERT_EDITION, [editionKey, storyId, version, summary])
  return await mapEditionRowToApi(dbResult.rows[0])
}

/*
select * from edition where edition_key='v7kv89xo-1';
*/
exports.getEdition = async (editionKey) => {
  console.log('publishingModel.getEdition')
  let result
  const QUERY = 'SELECT * FROM edition WHERE edition_key=$1'
  const dbResult = await db.query(QUERY, [editionKey])
  if (dbResult.rowCount === 1) {
    result = await mapEditionRowToApi(dbResult.rows[0])
  }
  return result
}

/*
insert into edition_genre (edition_id, genre_id)
select edition.id, genre_codes.id from edition, genre_codes
where edition.edition_key='v7kv89xo-1' and genre_codes.code='mystery';
*/
const assignGenre = async (editionKey, code) => {
  console.log('publishingModel.assignGenre')
  const QUERY = 'insert into edition_genre (edition_id, genre_id) '
    + 'select edition.id, genre_codes.id from edition, genre_codes '
    + 'where edition.edition_key=$1 and genre_codes.code=$2'
  try {
    const dbResult = await db.query(QUERY, [editionKey, code])
  } catch (error) {
    // TODO check error code for dupes, okay to swallow
    console.log(error)
  }
}

/*
delete from edition_genre
where edition_id=(select id from edition where edition_key='v7kv89xo-1')
and genre_id=(select id from genre_codes where code='mystery');
*/
const unassignGenre = async (editionKey, code) => {
  console.log('publishingModel.unassignGenre')
  const QUERY = 'delete from edition_genre '
    + 'where edition_id=(select id from edition where edition_key=$1) '
    + 'and genre_id=(select id from genre_codes where code=$2)'
  const dbResult = await db.query(QUERY, [editionKey, code])
}

/*
update edition
set rating=(select id from rating_codes where code='Y')
where edition_key='v7kv89xo-1';
*/
exports.updateEdition = async (editionKey, editionUpdate) => {
  console.log('publishingModel.updateEdition')
  let updates = ''
  const args = [editionKey]
  if (editionUpdate.rating) {
    const QUERY = 'update edition '
      + 'set rating=(select id from rating_codes where code=$2) '
      + 'where edition_key=$1'
    dbResult = await db.query(QUERY, [editionKey, editionUpdate.rating])
  }

  // take care of genre changes
  if (editionUpdate.genre) {
    const currentGenreList = await getStoryGenre(editionKey)
    if (editionUpdate.genre.toAssign) {
      editionUpdate.genre.toAssign.forEach(async code => {
        if (!currentGenreList.includes(code)) {
          console.log('Assigning', code)
          await assignGenre(editionKey, code)
        }
      })
    }
    if (editionUpdate.genre.toUnassign) {
      editionUpdate.genre.toUnassign.forEach(async code => {
        if (currentGenreList.includes(code)) {
          console.log('Unassigning', code)
          await unassignGenre(editionKey, code)
        }
      })
    }
  }
}

/*
insert into edition_scene (edition_id, scene_id, scene)
select edition.id, '6155tgph', 'serialized scene' from edition
where edition.edition_key='v7kv89xo-1';
*/
const saveScene = async (editionKey, sceneToSave) => {
  console.log('publishingModel.saveScene', sceneToSave)
  const serializedScene = JSON.stringify(sceneToSave)
  const INSERT_SCENE = 'insert into edition_scene (edition_id, scene_id, scene) '
    + 'select edition.id, $2, $3 from edition '
    + 'where edition.edition_key=$1'
  dbResult = await db.query(INSERT_SCENE, [editionKey, sceneToSave.sceneId, serializedScene])
}

/*
select destination_id, teaser
from signpost
where scene_id='6155tgph'
order by sign_order;
*/
const attachSignpostToScene = async (sceneToSave, saveCallback) => {
  console.log('publishingModel.attachSignpostToScene', sceneToSave.sceneId)
  const SELECT_SIGNS = 'select destination_id, teaser '
    + 'from signpost '
    + 'where scene_id=$1 '
    + 'order by sign_order'
  const dbResult = await db.query(SELECT_SIGNS, [sceneToSave.sceneId])
  const signpostRows = dbResult.rows
  let signpost
  if (signpostRows.length) {
    signpost = signpostRows.map(sign => ({
      sceneId: sign.destination_id,
      teaser: sign.teaser
    }))
  }
  if (signpost) {
    sceneToSave.signpost = signpost
  }
  saveCallback(sceneToSave)
}

/*
select scene.id as scene_id, title, prose, end_of_scene_prompt
from scene, edition
where edition_key='v7kv89xo-1' and edition.story_id=scene.story_id;
*/
exports.storeScenes = async (editionKey) => {
  console.log('publishingModel.storeScenes')

  // gather scenes of story
  const SELECT_SCENES = 'select scene.id as scene_id, title, prose, end_of_scene_prompt '
    + 'from scene, edition '
    + 'where edition_key=$1 and edition.story_id=scene.story_id'
  let dbResult = await db.query(SELECT_SCENES, [editionKey])
  const sceneRows = dbResult.rows

  // assemble scene to save, including signpost if any
  let sceneToSave
  sceneRows.forEach(async sceneRow => {
    sceneToSave = {
      sceneId: sceneRow.scene_id,
      title: sceneRow.title,
      prose: sceneRow.prose,
      endPrompt: sceneRow.end_of_scene_prompt
    }
    attachSignpostToScene(sceneToSave, (scene) => saveScene(editionKey, scene))
  })
  return true
}

/*
update edition set published_at=current_timestamp
where edition_key='v7kv89xo-1'
returning *;
*/
exports.finishPublishing = async (editionKey) => {
  console.log('publishingModel.finishPublishing')
  let edition
  const QUERY = 'update edition set published_at=current_timestamp '
    + 'where edition_key=$1 '
    + 'returning * '
  const dbResult = await db.query(QUERY, [editionKey])
  if (dbResult.rowCount === 1) {
    edition = await mapEditionRowToApi(dbResult.rows[0])
  }
  return edition
}

// TODO make it possible to redo store scenes --
//   say the author proofs, finds mistakes and makes corrections.
//   Want a way to throw out the previous proof and regenerate summary and scenes.

// TODO make it possible to throw out old editions -- take them out of circulation, so to speak
//   maybe write to file and store in S3 as loadable archive
//   premium feature
