const draftModel = require('../db/draftStoryModel');

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
    res.status(500).end();  // TODO standardize error messages
  }
};

exports.beginNewStory = async (req, res) => {
  console.log('draftStoryController.beginNewStory');
  res.end();
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
