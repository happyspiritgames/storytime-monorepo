const storyController = require('./storyController');
const playerController = require('./playerController');
const express = require('express');
const adminController = require('./adminController');

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

  // app.route('/api/players/self/profile/refresh')
  // .get([authCheck], playerController.refreshProfile);

  app.route('/api/players/:playerId')
  .get(playerController.getPlayer);

  // app.route('/api/players/find/:subject')
  // .get(playerController.findPlayer);

  const adminRouter = express.Router();

  adminRouter.use(authCheck);
  adminRouter.use(playerController.findOrCreatePlayer);
  adminRouter.use((req, res, next) => {
    console.log('Invoking admin API');
    if (!req.user || !req.user.roles || !req.user.roles.find((item) => item === 'admin')) {
      console.log('User is not logged in or does not have admin role.');
      res.status(401);
      next('Unauthorized access');
    }
    next();
  });

  adminRouter.route('/players')
  .get(adminController.getPlayers);

  app.use('/api/admin', adminRouter);



};
