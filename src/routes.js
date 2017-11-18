const storyController = require('./storyController');

module.exports = function (app) {
  app.route('/ping')
    .get(storyController.ping);

  app.route('/stories')
    .get(storyController.searchStories);

  app.route('/stories/:storyKey')
    .get(storyController.getPublishedStorySummary);

  app.route('/stories/:storyKey/scenes/:sceneKey')
    .get(storyController.getStoryScene);
};
