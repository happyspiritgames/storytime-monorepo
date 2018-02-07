const db = require('./postgres');
const { generateRandomString } = require('../util/generator');

const mapStoryRowToApi = (storyRow) => {
  return {
    storyKey: storyRow.id,
    authorId: storyRow.author_id,
    title: storyRow.title,
    tagLine: storyRow.tag_line,
    about: storyRow.about,
    firstSceneId: storyRow.first_scene_id,
    createdAt: storyRow.created_at,
    updatedAt: storyRow.updated_at
  }
};

const mapSceneRowToApi = (sceneRow) => {
  return {
    sceneKey: sceneRow.id,
    title: sceneRow.title,
    prose: sceneRow.prose,
    endPrompt: sceneRow.end_of_scene_prompt,
    createdAt: sceneRow.created_at,
    updatedAt: sceneRow.updated_at
  }
};

exports.getStories = async (authorId) => {
  console.log('draftStoryModel.getStories');
  const SEL_STORIES = 'SELECT * FROM story WHERE author_id=$1';
  const dbResult = await db.query(SEL_STORIES, [authorId]);
  if (dbResult.rowCount > 0) {
    return dbResult.rows.map((storyRow) => mapStoryRowToApi(storyRow));
  }
}

exports.getStory = async (id) => {
  console.log('draftStoryModel.getStory');
  const SEL_STORY = 'SELECT * FROM story WHERE id=$1';
  const dbResult = await db.query(SEL_STORY, [id]);
  if (dbResult.rowCount === 1) {
    return mapStoryRowToApi(dbResult.rows[0]);
  }
}

exports.createStory = async (authorId, title, tagLine, about) => {
  console.log('draftStoryModel.createStory');
  const INS_STORY = 'INSERT INTO story (id, author_id, title, tag_line, about, first_scene_id) VALUES ($1, $2, $3, $4, $5, $6)';
  const storyId = generateRandomString(8);
  const firstSceneId = createScene(storyId, 'Start Here', 'Tell your story...', 'Now what?');
  const dbResult = await db.query(INS_STORY, [storyId, authorId, title, tagLine, about, firstSceneId]);
  if (result.rowCount !== 1) {
    console.error('Did not create story');
    return;
  }
  return storyId;
}

exports.updateStory = async (storyId, title, tagLine, about, firstSceneId) => {
  console.log('draftStoryModel.updateStory');
}

exports.getScene = async (storyId, sceneId) => {
  console.log('draftStoryModel.getScene');
  const SEL_SCENE = 'SELECT * FROM scene WHERE story_id=$1 AND id=$2';
  const dbResult = await db.query(SEL_SCENE, [storyId, sceneId]);
  if (dbResult.rowCount === 1) {
    return mapSceneRowToApi(dbResult.rows[0]);
  }
}

exports.createScene = async (storyId, title, prose, endPrompt) => {
  console.log('draftStoryModel.createScene');
  const INS_SCENE = 'INSERT INTO scene (id, story_id, title, prose, end_of_scene_prompt';
  const sceneId = generateRandomString(8);
  const dbResult = await db.query(INS_SCENE, [sceneId, storyId, title, prose, endPrompt]);
  if (result.rowCount !== 1) {
    console.error('Did not create scene');
    return;
  }
  return sceneId;
}

exports.updateScene = async (sceneId, title, prose, endPrompt) => {
  console.log('draftStoryModel.updateScene');

}

exports.addDestination = async (originSceneId, targetSceneId, teaser) => {
  console.log('draftStoryModel.addDestination');

}

exports.updateDestination = async (originSceneId, targetSceneId, teaser) => {
  console.log('draftStoryModel.updateDestination');

}

exports.deleteDestination = async (originSceneId, targetSceneId) => {
  console.log('draftStoryModel.deleteDestination');

}
