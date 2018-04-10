const db = require('./postgres')

/*
select code from rating_codes where id=19
*/
exports.getStoryRating = async (ratingId) => {
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
exports.getStoryGenre = async (editionKey) => {
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
    const ratingCode = await this.getStoryRating(editionToPatch.rating)
    editionToPatch['rating'] = ratingCode
  }
  // merge in associated genres
  const genre = await this.getStoryGenre(editionToPatch.editionKey)
  console.log('patching genre with', genre)
  editionToPatch['genre'] = genre
  return editionToPatch
}

/**
 * Turns edition row from database into form expected by StoryTime authoring API.
 *
 * @param {*} editionRow
 */
exports.mapEditionRowToApi = async (editionRow) => {
  const summaryInfo = JSON.parse(editionRow.summary)
  const summary = {
    title: summaryInfo.title,
    penName: summaryInfo.pen_name,
    tagLine: summaryInfo.tag_line,
    about: summaryInfo.about,
    firstSceneId: summaryInfo.first_scene_id
  }
  const roughEdition = {
    editionKey: editionRow.edition_key,
    storyId: editionRow.story_id,
    version: editionRow.version,
    summary: summary,
    rating: editionRow.rating,
    publishedAt: editionRow.published_at
  }
  return await patchEdition(roughEdition)
}

/*
select * from edition, edition_status_codes
where edition.status=edition_status_codes.id
and edition_status_codes.code='available'
*/
exports.getLatestEditions = async () => {
  console.log('storyEditionModel.getLatestEditions')
  const QUERY = 'select * from edition, edition_status_codes '
    + 'where edition_status_codes.code=$1 '
    + 'and edition.status=edition_status_codes.id '
  const dbResult = await db.query(QUERY, ['available'])
  if (dbResult.rowCount) {
    const latest = Promise.all(dbResult.rows.map(async (editionRow) => this.mapEditionRowToApi(editionRow)))
    return latest
  } else {
    return []
  }
}

/*
select summary from edition where edition_key='v7kv89xo-1';
*/
exports.getSummary = async (editionKey) => {
  console.log('storyEditionModel.getSummary')
  const QUERY = 'select summary from edition where edition_key=$1'
  const dbResult = await db.query(QUERY, [editionKey])
  if (dbResult.rowCount) {
    const summary = dbResult.rows[0].summary
    console.log('found summary', summary)
    return JSON.parse(summary)
  } else {
    console.log('did not find summary')
  }
}

/*
select scene from edition_scene, edition
where edition.id=edition_scene.edition_id
and edition.edition_key='979jafrz-1' and scene_id='syzzimx4'
*/
exports.getScene = async (editionKey, sceneId) => {
  console.log('storyEditionModel.getScene')
  const QUERY = 'select scene from edition_scene, edition '
    + 'where edition.edition_key=$1 and edition_scene.edition_id=edition.id '
    + 'and scene_id=$2'
  const dbResult = await db.query(QUERY, [editionKey, sceneId])
  if (dbResult.rowCount) {
    const scene = dbResult.rows[0].scene
    console.log('found scene', scene)
    return JSON.parse(scene)
  } else {
    console.log('did not find scene')
  }
}