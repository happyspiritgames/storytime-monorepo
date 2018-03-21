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
    const storyId = await draftModel.createStory(playerId, title, tagLine, about);
    const sceneId = await draftModel.createScene(storyId, 'Start Here', 'Tell your story', 'Now what?');
    await draftModel.updateStory(storyId, null, null, null, sceneId);
    const summary = await draftModel.getStory(storyId);
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
    for (let i = 0; i < scenes.length; i++) {
      const scene = scenes[i];
      const signpost = await draftModel.getSignpost(scene.sceneId);
      if (signpost) {
        scene['signpost'] = signpost;
      }
    }
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
    const signpost = await draftModel.getSignpost(sceneId);
    if (!signpost) {
      res.status(404).json(theEnd);
    }
    res.json(signpost);
  } catch (e) {
    console.error('Problem getting signpost for scene', e);
    res.status(500).json(internalError);
  }
};

const takeNap = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

exports.updateSignpost = async (req, res) => {
  console.log('draftStoryController.updateSignpost');
  const { playerId } = req.user;
  const { storyId, sceneId } = req.params;
  const { toUpdate, toDelete } = req.body;
  console.log(req.body);

  try {
    if (!verifyStoryAuthorization(playerId, storyId, res)) {
      return;
    }
    if (toDelete) {
      console.log('deleting signs on signpost');
      toDelete.forEach(async destinationId => {
        await draftModel.deleteSignpostSign(sceneId, destinationId);
      });
    }
    if (toUpdate) {
      console.log('updating signpost', toUpdate, toUpdate.length);
      toUpdate.forEach(async update => {
        const sign = await draftModel.getSign(sceneId, update.destinationId);
        if (sign) {
          console.log('found sign', sign);
          if (sign.teaser !== update.teaser || sign.order !== update.order) {
            console.log('update sign', update);
            await draftModel.updateSignpostSign(sceneId, update.destinationId, update.teaser, update.order);
          } else {
            console.log('no update, same as existing', update);
          }
        } else {
          console.log('adding new sign');
          await draftModel.addSignpostSign(sceneId, update.destinationId, update.teaser, update.order);
        }
      });
    }

    // TODO might be horrible; just a work-around until I can troubleshoot async problems
    await takeNap(500);

    const signpost = await draftModel.getSignpost(sceneId);
    console.log('return updated signpost', signpost)
    res.status(202).send(signpost);
  } catch (e) {
    console.error('Problem updating signpost for scene', e);
    res.status(500).json(internalError);
  }
};

exports.startPublishingProcess = async (req, res) => {
  res.status(501).send(errorMessage('Coming soon...'));
};
