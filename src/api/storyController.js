const storyModel = require('../db/storyModel');
const { errorMessage, internalError } = require('./errors');

exports.ping = (req, res) => {
  console.log('ping');
  res.send({ salutation: 'pong' });
};

exports.searchStories = (req, res) => {
  console.log('storyController.searchStories');
  try {
    res.send(storyModel.getRecommendedStories());
  } catch (e) {
    console.error('Problem getting published stories', e);
    res.status(500).send(internalError);
  }
};

exports.getPublishedStorySummary = (req, res) => {
  const { storyId } = req.params;
  console.log('storyController.getPublishedStorySummary', storyId);
  try {
    const story = storyModel.getPublishedStorySummary(storyId);
    if (story) {
      res.json(story);
    } else {
      res.status(404).json(errorMessage('Story not found'));
    }
  } catch (e) {
    console.error('Problem getting story summary', e);
    res.status(500).send(internalError);
  }
};

exports.getStoryScene = (req, res) => {
  const { storyId, sceneId } = req.params;
  console.log('storyController.getStoryScene', storyId, sceneId);
  try {
    const scene = storyModel.getStoryScene(storyId, sceneId);
    if (scene) {
      res.json(scene);
    } else {
      res.status(404).json(errorMessage('Scene not found'));
    }
  } catch (e) {
    console.error('Problem getting scene for story', e);
    res.status(500).send(internalError);
  }
};
