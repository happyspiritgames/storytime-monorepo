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
select genre_codes.code as code from genre_codes, edition_genre, edition
where edition.edition_key='v7kv89xo-1'
and edition.id=edition_genre.edition_id and edition_genre.genre_id=genre_codes.id;
 */
const getStoryGenre = async (editionKey) => {
  console.log('publishingModel.getStoryGenre')
  const SELECT = 'select genre_codes.code as code from genre_codes, edition_genre, edition '
    + 'where edition.edition_key=$1 '
    + 'and edition.id=edition_genre.edition_id and edition_genre.genre_id=genre_codes.id'
  const dbResult = await db.query(SELECT, [editionKey])
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
  const genre = await getStoryGenre(editionToPatch.storyId, editionToPatch.version)
  editionToPatch['genre'] = genre
  return editionToPatch
}

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
  const SEL_STORY = 'select version from edition where story_id=$1 and published_at is null'
  const dbResult = await db.query(SEL_STORY, [storyId])
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
  const SELECT = 'select version from edition '
    + 'where story_id=$1 and published_at is not null '
    + 'order by published_at desc nulls last limit 1'
  const dbResult = await db.query(SELECT, [storyId])
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
    const SEL_STORY = 'select * from edition WHERE story_id=$1'
    const dbResult = await db.query(SEL_STORY, [storyId])
    result = await Promise.all(dbResult.rows.map(row => mapEditionRowToApi(row)))
  } catch (err) {
    console.error(err)
  }
  return result
}

/*
insert into edition
(edition_key, story_id, version, summary)
values ('v7kv89xo-1', 'v7kv89xo', '1', 'serialized-json-doc')
returning *;
*/
exports.createNewEdition = async (edition_key, storyId, version, summary) => {
  console.log('publishingModel.createNewEdition')
  const INSERT = 'INSERT INTO edition '
    + '(edition_key, story_id, version, summary) '
    + 'values ($1, $2, $3, $4) '
    + 'returning * '
  let dbResult = await db.query(INSERT, [edition_key, storyId, version, summary])
  return await mapEditionRowToApi(dbResult.rows[0])
}

/*
select * from edition where edition_key='v7kv89xo-1';
*/
exports.getEdition = async (editionKey) => {
  console.log('publishingModel.getEdition')
  let result
  const SEL_STORY = 'SELECT * FROM edition WHERE edition_key=$1'
  const dbResult = await db.query(SEL_STORY, [editionKey])
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
  const INSERT = 'insert into edition_genre (edition_id, genre_id) '
    + 'select edition.id, genre_codes.id from edition, genre_codes '
    + 'where edition.edition_key=$1 and genre_codes.code=$2'
  try {
    const dbResult = await db.query(INSERT, [editionKey, code])
    return await mapEditionRowToApi(dbResult.rows[0])
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
  const DELETE = 'delete from edition_genre '
    + 'where edition_id=(select id from edition where edition_key=$1) '
    + 'and genre_id=(select id from genre_codes where code=$2)'
  const dbResult = await db.query(DELETE, [editionKey, code])
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
    const UPDATE = 'update edition '
      + 'set rating=(select id from rating_codes where code=$2) '
      + 'where edition_key=$1'
    dbResult = await db.query(UPDATE, [editionKey, editionUpdate.rating])
  }

  // take care of genre changes
  if (editionUpdate.genre) {
    const currentGenreList = await getStoryGenre(editionKey)
    if (editionUpdate.genre.toAssign) {
      editionUpdate.genre.toAssign.forEach(code => {
        if (!currentGenreList.includes(code)) {
          console.log('Assigning', code)
          assignGenre(storyId, version, code)
        }
      })
    }
    if (editionUpdate.genre.toUnassign) {
      editionUpdate.genre.toUnassign.forEach(code => {
        if (currentGenreList.includes(code)) {
          console.log('Unassigning', code)
          unassignGenre(storyId, version, code)
        }
      })
    }
  }
}

const storeScene = async (editionKey, scene) => {
  console.log('implement me')
}

/*
update edition set published_filename='979jafrz_0-1.json', published_at=current_timestamp
where story_id='979jafrz' and version='0-1';
*/
exports.finishPublishing = async (editionKey, fullStory) => {
  console.log('publishingModel.removeGenre')
  let edition
  const UPDATE = 'update edition set summary=$2, published_at=current_timestamp '
    + 'where editor_key=$1 '
    + 'returning * '
  const dbResult = await db.query(UPDATE, [editionKey, fullStory.summary])
  fullStory.scenes.values.forEach(scene => storeScene(editionKey, scene))
  if (dbResult.rowCount === 1) {
    edition = await mapEditionRowToApi(dbResult.rows[0])
  }
}
