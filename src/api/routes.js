const storyController = require('./storyController')
const playerController = require('./playerController')
const express = require('express')
const adminRoutes = require('./adminRoutes')
const editorRoutes = require('./editorRoutes')

module.exports = function (app, authCheck) {
  const apiRouter = express.Router()
  apiRouter.route('/ping').get(storyController.ping)
  apiRouter.route('/stories').get(storyController.searchStories)
  apiRouter.route('/stories/:storyId').get(storyController.getPublishedStorySummary)
  apiRouter.route('/stories/:storyId/scenes/:sceneId').get(storyController.getStoryScene)
  apiRouter.route('/codes/:type').get(storyController.getCodes)

  const authRouter = express.Router()
  authRouter.all('*', authCheck, playerController.findOrCreatePlayer)
  authRouter.route('/self/roles').get(playerController.getRoles)
  authRouter.route('/self/roles/agree-author').put(playerController.agreeToAuthorTerms)
  authRouter.route('/self/profile')
  .get(playerController.getSelfProfile)
  .put(playerController.updateSelfProfile)
  authRouter.route('/players/:playerId').get(playerController.getPlayer)

  // assemble routers
  apiRouter.use('/', authRouter)
  apiRouter.use('/admin', adminRoutes)
  apiRouter.use('/draft-stories', editorRoutes)
  app.use('/api', apiRouter)
};
