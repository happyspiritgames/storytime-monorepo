const draftModel = require('../db/draftStoryModel');
const { internalError, errorMessage, theEnd } = require('./errors');

const verifyStoryAuthorization = async (playerId, storyId, res) => {
  const authorId = await draftModel.getStoryOwner(storyId);
  if (!authorId) {
    res.status(404).json(errorMessage('Story not found.'));
    return false;
  }
  if (authorId !== playerId) {
    res.status(401).json(errorMessage('You do not have permission to edit that story.'));
    return false;
  }
  return true;
}

/**
 * StoryTime API method for retrieving draft story summaries for the current player.
 *
 * @param {*} req - the HTTP request
 * @param {*} res - the HTTP response
 */
exports.getDraftSummaries = async (req, res) => {
  console.log('draftStoryController.getStories');
  const authorId = req.user.playerId;
  try {
    const stories = await draftModel.getStories(authorId);
    res.json(stories);
  } catch (e) {
    console.error('Problem getting draft stories', e);
    res.status(500).json(internalError);
  }
};

exports.beginNewStory = async (req, res) => {
  const { playerId } = req.user;
  const { title, tagLine, about } = req.body;
  console.log('draftStoryController.beginNewStory', playerId, title);
  try {
    const storyKey = await draftModel.createStory(playerId, title, tagLine, about);
    const sceneKey = await draftModel.createScene(storyKey, 'Start Here', 'Tell your story', 'Now what?');
    await draftModel.updateStory(storyKey, null, null, null, sceneKey);
    const summary = await draftModel.getStory(storyKey);
    res.status(201).json(summary);
  } catch (e) {
    console.error('Problem creating draft story', e);
    res.status(500).json(internalError);
  }
};

exports.getStorySummary = async (req, res) => {
  console.log('draftStoryController.getStorySummary');
  const { playerId } = req.user;
  const { storyId } = req.params;
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    const summary = await draftModel.getStory(storyId);
    res.json(summary);
  } catch (e) {
    console.error('Problem getting draft summary', e);
    res.status(500).json(internalError);
  }
};

exports.updateStorySummary = async (req, res) => {
  console.log('draftStoryController.updateStorySummary');
  const { playerId } = req.user;
  const { storyId } = req.params;
  const { title, tagLine, about, firstSceneId } = req.body;
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    await draftModel.updateStory(storyId, title, tagLine, about, firstSceneId);
    const summary = await draftModel.getStory(storyId);
    res.status(202).json(summary);
  } catch (e) {
    console.error('Problem updating draft summary', e);
    res.status(500).json(internalError);
  }
};

exports.getFullStory = async (req, res) => {
  console.log('draftStoryController.getFullStory');
  const { playerId } = req.user;
  const { storyId } = req.params;
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    const summary = await draftModel.getStory(storyId);
    const scenes = await draftModel.getScenes(storyId);

    // TODO blend signposts into scenes

    const fullStory = {
      summary: summary,
      scenes: scenes
    };
    res.json(fullStory);
  } catch (e) {
    console.error('Problem getting full draft', e);
    res.status(500).json(internalError);
  }
};

exports.beginNewScene = async (req, res) => {
  const { playerId } = req.user;
  const { storyId } = req.params;
  const { title, prose, endPrompt } = req.body;
  console.log('draftStoryController.beginNewScene', storyId, title);
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    const sceneId = await draftModel.createScene(storyId, title, prose, endPrompt);
    const scene = await draftModel.getScene(storyId, sceneId);
    res.status(201).json(scene);
  } catch (e) {
    console.error('Problem creating new scene', e);
    res.status(500).json(internalError);
  }
};

exports.getScene = async (req, res) => {
  const { playerId } = req.user;
  const { storyId, sceneId } = req.params;
  console.log('draftStoryController.getScene', storyId, sceneId);
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    const scene = await draftModel.getScene(storyId, sceneId);
    if (!scene) {
      res.status(404).json(errorMessage('The scene was not found.'));
      return;
    }
    res.json(scene);
  } catch (e) {
    console.error('Problem getting draft scene', e);
    res.status(500).json(internalError);
  }
};

exports.updateScene = async (req, res) => {
  console.log('draftStoryController.updateScene');
  const { playerId } = req.user;
  const { storyId, sceneId } = req.params;
  const { title, prose, endPrompt } = req.body;
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    await draftModel.updateScene(storyId, sceneId, title, prose, endPrompt);
    const scene = await draftModel.getScene(storyId, sceneId);
    res.status(202).json(scene);
  } catch (e) {
    console.error('Problem updating draft scene', e);
    res.status(500).json(internalError);
  }
};

exports.getSignpost = async (req, res) => {
  console.log('draftStoryController.getSignpost');
  const { playerId } = req.user;
  const { storyId, sceneId } = req.params;
  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    const signpostSigns = await draftModel.getSignpostSigns(sceneId);
    if (!signpostSigns) {
      res.status(404).json(theEnd);
    }
    res.json(signpostSigns);
  } catch (e) {
    console.error('Problem getting signpost for scene', e);
    res.status(500).json(internalError);
  }
};

exports.updateSignpost = async (req, res) => {
  console.log('draftStoryController.updateSignpost');
  const { playerId } = req.user;
  const { storyId, sceneId } = req.params;
  const { toAdd, toUpdate, toRemove } = req.body;

  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    if (toRemove) {
      toRemove.forEach(async destinationId => {
        await draftModel.deleteSignpostSign(sceneId, destinationId);
      });
    }
    if (toAdd) {
      toAdd.forEach(async sign => {
        await draftModel.addSignpostSign(sceneId, sign.destinationId, sign.teaser, sign.signOrder);
      });
    }
    if (toUpdate) {
      toUpdate.forEach(async update => {
        await draftModel.updateSignpostSign(sceneId, update.destinationId, update.teaser, update.signOrder);
      });
    }
  } catch (e) {
    console.error('Problem updating signpost for scene', e);
    res.status(500).json(internalError);
  }
};
