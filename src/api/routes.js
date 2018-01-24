const storyController = require('./storyController');
const playerController = require('./playerController');

module.exports = function (app, authCheck) {
  app.route('/api/ping')
  .get(storyController.ping);

  app.route('/api/stories')
  .get(storyController.searchStories);

  app.route('/api/stories/:storyKey')
  .get(storyController.getPublishedStorySummary);

  app.route('/api/stories/:storyKey/scenes/:sceneKey')
  .get(storyController.getStoryScene);

  app.route('/api/players')
  .get(playerController.getPlayers);

  app.route('/api/players/self/profile')
  .get([authCheck, playerController.findOrCreatePlayer], playerController.getSelfProfile)
  .put([authCheck, playerController.findOrCreatePlayer], playerController.updateSelfProfile);

  // TODO remove this, scaffolding
  app.route('/api/players/self/profile/refresh')
  .get([authCheck], playerController.refreshProfile);

  app.route('/api/players/:playerId')
  .get(playerController.getPlayer);

  // TODO remove this, scaffolding
  app.route('/api/players/find/:subject')
  .get(playerController.findPlayer);
};
