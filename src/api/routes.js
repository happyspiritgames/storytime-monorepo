const storyController = require('./storyController');
const playerController = require('./playerController');
const express = require('express');
const adminController = require('./adminController');

module.exports = function (app, authCheck) {
  const apiRouter = express.Router();
  apiRouter.route('/ping').get(storyController.ping);
  apiRouter.route('/stories').get(storyController.searchStories);
  apiRouter.route('/stories/:storyKey').get(storyController.getPublishedStorySummary);
  apiRouter.route('/stories/:storyKey/scenes/:sceneKey').get(storyController.getStoryScene);

  // TODO decide whether needed; if so, auth needed?
  apiRouter.route('/players').get(playerController.getPlayers);

  const authRouter = express.Router();

  authRouter.all('*', authCheck, playerController.findOrCreatePlayer);

  authRouter.route('/players/self/roles').get(playerController.getRoles);

  authRouter.route('/players/self/profile')
  .get(playerController.getSelfProfile)
  .put(playerController.updateSelfProfile);

  authRouter.route('/players/:playerId')
  .get(playerController.getPlayer);

  // app.route('/api/players/find/:subject')
  // .get(playerController.findPlayer);

  const adminRouter = express.Router();

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

  // assemble routers
  apiRouter.use('/', authRouter);
  apiRouter.use('/admin', adminRouter);
  app.use('/api', apiRouter);
};
