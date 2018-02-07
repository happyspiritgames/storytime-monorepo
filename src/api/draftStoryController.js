const draftModel = require('../db/draftStoryModel');
const { internalError } = require('./errors');

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
    console.error('Problem with getStories', e);
    res.status(500).send(internalError);
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
    res.json(summary);
  } catch (e) {
    console.error('Problem creating story', e);
    res.status(500).send(internalError);
  }
};

exports.getStorySummary = async (req, res) => {
  console.log('draftStoryController.getStorySummary');
  res.end();
};

exports.updateStorySummary = async (req, res) => {
  console.log('draftStoryController.updateStorySummary');
  res.end();
};

exports.getFullStory = async (req, res) => {
  console.log('draftStoryController.getFullStory');
  res.end();
};

exports.beginNewScene = async (req, res) => {
  console.log('draftStoryController.beginNewScene');
  res.end();
};

exports.getScene = async (req, res) => {
  console.log('draftStoryController.getScene');
  res.end();
};

exports.updateScene = async (req, res) => {
  console.log('draftStoryController.updateScene');
  res.end();
};

exports.deleteScene = async (req, res) => {
  console.log('draftStoryController.deleteScene');
  res.end();
};

exports.getDestinations = async (req, res) => {
  console.log('draftStoryController.addDestination');
  res.end();
};

exports.updateDestinations = async (req, res) => {
  console.log('draftStoryController.updateDestination');
  res.end();
};
