const repo = require('./persistence/storyRepo');

exports.ping = (req, res) => {
  res.send({ salutation: 'pong' });
};

exports.searchStories = (req, res) => {
  res.send(repo.getRecommendedStories());
};

exports.getPublishedStorySummary = (req, res) => {
  const {storyKey} = req.params;
  res.send(repo.getPublishedStorySummary(storyKey));
};

exports.getStoryScene = (req, res) => {
  const {storyKey, sceneKey} = req.params;
  res.send(repo.getStoryScene(storyKey, sceneKey));
};
