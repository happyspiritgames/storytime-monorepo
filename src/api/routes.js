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
  // .post(playerController.createPlayer);

  app.route('/api/players/:playerId')
  .get(playerController.getPlayer);

  app.route('/api/players/find/:subject')
  .get(playerController.findPlayer);

  // app.route('/api/players/profile')
  //   .get([authCheck, playerController.findOrCreatePlayer], playerController.getOwnProfile);

  // app.route('/api/unsecure/players/profile')
  //   .get(playerController.getOwnProfile)
  //   .put(playerController.updateOwnProfile);


};
