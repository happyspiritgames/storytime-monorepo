const storyController = require('./storyController');

module.exports = function (app) {
  app.route('/api/ping')
    .get(storyController.ping);

  app.route('/api/stories')
    .get(storyController.searchStories);

  app.route('/api/stories/:storyKey')
    .get(storyController.getPublishedStorySummary);

  app.route('/api/stories/:storyKey/scenes/:sceneKey')
    .get(storyController.getStoryScene);
};
