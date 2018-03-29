const db = require('./postgres')
const { generateRandomString } = require('../util/generator')

const mapStoryRowToApi = (storyRow) => {
  return {
    storyId: storyRow.id,
    authorId: storyRow.author_id,
    title: storyRow.title,
    tagLine: storyRow.tag_line,
    about: storyRow.about,
    firstSceneId: storyRow.first_scene_id,
    createdAt: storyRow.created_at,
    updatedAt: storyRow.updated_at
  }
}

const mapSceneRowToApi = (sceneRow) => {
  return {
    sceneId: sceneRow.id,
    title: sceneRow.title,
    prose: sceneRow.prose,
    endPrompt: sceneRow.end_of_scene_prompt,
    createdAt: sceneRow.created_at,
    updatedAt: sceneRow.updated_at
  }
}

const mapSignpostRowToApi = (signpostRow) => {
  return {
    destinationId: signpostRow.destination_id,
    teaser: signpostRow.teaser,
    order: signpostRow.sign_order
  }
}

exports.getStories = async (authorId) => {
  console.log('draftStoryModel.getStories');
  const SEL_STORIES = 'SELECT * FROM story WHERE author_id=$1'
  const dbResult = await db.query(SEL_STORIES, [authorId])
  if (dbResult.rowCount > 0) {
    return dbResult.rows.map((storyRow) => mapStoryRowToApi(storyRow))
  }
}

exports.getStory = async (id) => {
  console.log('draftStoryModel.getStory');
  const SEL_STORY = 'SELECT * FROM story WHERE id=$1'
  const dbResult = await db.query(SEL_STORY, [id])
  if (dbResult.rowCount === 1) {
    return mapStoryRowToApi(dbResult.rows[0])
  }
}

exports.getStoryOwner = async (storyId) => {
  console.log('draftStoryModel.getStoryOwner')
  const SEL_STORY_AUTHOR = 'SELECT author_id FROM story WHERE id=$1'
  const dbResult = await db.query(SEL_STORY_AUTHOR, [storyId])
  if (dbResult.rowCount === 1) {
    return dbResult.rows[0].author_id
  }
}

exports.createStory = async (authorId, title = '', tagLine = '', about = '') => {
  console.log('draftStoryModel.createStory')
  const INS_STORY = 'INSERT INTO story (id, author_id, title, tag_line, about) VALUES ($1, $2, $3, $4, $5)'
  const storyId = generateRandomString(8)
  let dbResult = await db.query(INS_STORY, [storyId, authorId, title, tagLine, about])
  if (dbResult.rowCount !== 1) {
    console.error('Did not create story', authorId, title, tagLine, about)
    return
  }
  return storyId
}

exports.updateStory = async (storyId, title, tagLine, about, firstSceneId) => {
  console.log('draftStoryModel.updateStory')
  let updates = 'updated_at=current_timestamp'
  const args = [storyId]
  if (title) {
    args.push(title)
    updates = updates.concat(`, title=$${args.length} `)
  }
  if (tagLine) {
    args.push(tagLine)
    updates = updates.concat(`, tag_line=$${args.length} `)
  }
  if (about) {
    args.push(about)
    updates = updates.concat(`, about=$${args.length} `)
  }
  if (firstSceneId) {
    args.push(firstSceneId)
    updates = updates.concat(`, first_scene_id=$${args.length} `)
  }
  if (args.length === 1) {
    // nothing to update
    return
  }
  const UPD_STORY = `UPDATE story SET ${updates} WHERE id=$1`
  dbResult = await db.query(UPD_STORY, args)
}

exports.getScenes = async (storyId) => {
  console.log('draftStoryModel.getScenes')
  const SEL_SCENES = 'SELECT * FROM scene WHERE story_id=$1'
  const dbResult = await db.query(SEL_SCENES, [storyId])
  if (dbResult.rowCount > 0) {
    return dbResult.rows.map(sceneRow => mapSceneRowToApi(sceneRow))
  } else {
    return []
  }
}

exports.getScene = async (storyId, sceneId) => {
  console.log('draftStoryModel.getScene')
  const SEL_SCENE = 'SELECT * FROM scene WHERE story_id=$1 AND id=$2'
  const dbResult = await db.query(SEL_SCENE, [storyId, sceneId])
  if (dbResult.rowCount === 1) {
    return mapSceneRowToApi(dbResult.rows[0])
  }
}

exports.createScene = async (storyId, title = '', prose = '', endPrompt = '') => {
  console.log('draftStoryModel.createScene')
  const INS_SCENE = 'INSERT INTO scene '
    + '(id, story_id, title, prose, end_of_scene_prompt) '
    + 'VALUES ($1, $2, $3, $4, $5)'
  const sceneId = generateRandomString(8)
  const dbResult = await db.query(INS_SCENE, [sceneId, storyId, title, prose, endPrompt])
  if (dbResult.rowCount !== 1) {
    console.error('Did not create scene')
    return
  }
  return sceneId
}

exports.updateScene = async (storyId, sceneId, title, prose, endPrompt) => {
  console.log('draftStoryModel.updateScene')
  let updates = 'updated_at=current_timestamp'
  const args = [storyId, sceneId]
  if (title) {
    args.push(title)
    updates = updates.concat(`, title=$${args.length} `)
  }
  if (prose) {
    args.push(prose)
    updates = updates.concat(`, prose=$${args.length} `)
  }
  if (endPrompt) {
    args.push(endPrompt)
    updates = updates.concat(`, end_of_scene_prompt=$${args.length} `)
  }
  if (args.length === 2) {
    // nothing to update
    return
  }
  const UPD_SCENE = `UPDATE scene SET ${updates} WHERE story_id=$1 AND id=$2`
  dbResult = await db.query(UPD_SCENE, args)
}

exports.getSignpost = async (sceneId) => {
  console.log('draftStoryModel.getSignpost')
  const SEL_SIGNS = 'SELECT * FROM signpost WHERE scene_id=$1 ORDER BY sign_order'
  const dbResult = await db.query(SEL_SIGNS, [sceneId])
  if (dbResult.rowCount > 0) {
    return dbResult.rows.map((signpostRow) => mapSignpostRowToApi(signpostRow))
  }
}

exports.getSign = async (sceneId, destinationId) => {
  console.log('draftStoryModel.getSign')
  const SEL_SIGN = 'SELECT * FROM signpost WHERE scene_id=$1 AND destination_id=$2'
  const dbResult = await db.query(SEL_SIGN, [sceneId, destinationId])
  if (dbResult.rowCount === 1) {
    return mapSignpostRowToApi(dbResult.rows[0])
  } else {
    console.log('no sign found', sceneId, destinationId)
  }
}

exports.addSignpostSign = async (sceneId, destinationId, teaser, signOrder) => {
  console.log('draftStoryModel.addSignpostSign')
  const INS_SIGN = 'INSERT INTO signpost '
    + '(scene_id, destination_id, teaser, sign_order) '
    + 'VALUES ($1, $2, $3, $4)'
  const dbResult = await db.query(INS_SIGN, [sceneId, destinationId, teaser, signOrder])
  if (dbResult.rowCount !== 1) {
    console.error('Did not create signpost sign', sceneId, destinationId, teaser, signOrder)
  }
}

exports.updateSignpostSign = async (sceneId, destinationId, teaser, signOrder) => {
  console.log('draftStoryModel.updateSignpostSign')
  let updates = ''
  const args = [sceneId, destinationId]
  if (teaser) {
    args.push(teaser)
    updates = updates.concat(`teaser=$${args.length}, `)
  }
  if (signOrder) {
    args.push(signOrder)
    updates = updates.concat(`sign_order=$${args.length}, `)
  }
  if (args.length === 2) {
    // nothing to update
    return
  }
  updates = updates.substring(0, updates.length-2)
  const UPD_SIGN = `UPDATE signpost SET ${updates} WHERE scene_id=$1 AND destination_id=$2`
  dbResult = await db.query(UPD_SIGN, args)
  if (dbResult.rowCount !== 1) {
    console.error('Did not update signpost sign', sceneId, destinationId, teaser, signOrder)
  }
}

exports.deleteSignpostSign = async (sceneId, destinationId) => {
  console.log('draftStoryModel.deleteSignpostSign')
  const DEL_SIGNS = 'DELETE FROM signpost WHERE scene_id=$1 AND destination_id=$2'
  const dbResult = await db.query(DEL_SIGNS, [sceneId, destinationId])
  if (dbResult.rows > 0) {
    return dbResult.rows.map((signpostRow) => mapSignpostRowToApi(signpostRow))
  }
}
