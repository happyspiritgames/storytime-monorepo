const express = require('express');
const storyController = require('./storyController');

const router = express.Router();

router.all('*', (req, res, next) => {
  console.log('Invoking author API');
  if (!req.user || !req.user.roles || !req.user.roles.find((item) => item === 'author')) {
    console.log('User is not logged in or does not have author role.');
    res.status(401);
    next('Unauthorized access');
  }
  next();
});

// for seeing a list of stories owned by the author
router.route('/stories')
.get(storyController.getStories())
.post(storyController.beginNewStory());

// for working with latest draft of a particular story
router.route('/stories/:storyId')
.get(storyController.getStorySummary())
.put(storyController.updateStorySummary());

// returns the complete story, including the summary and all scenes;
// payload could be quite large, good for initial load and when client gets out of sync
router.route('/stories/:storyId/full')
.get(storyController.getFullStory())


// for working with scenes of draft story
router.route('/stories/:storyId/scenes').post(storyController.beginNewScene());  // to support alternate workflow where scenes are wired up afterward
router.route('/stories/:storyId/scenes/:sceneId')
.get(storyController.getScene())
.put(storyController.updateScene())
.delete(storyController.deleteScene())

router.route('/stories/:storyId/signpost')
.post(storyController.addDestination())
.put(storyController.updateDestinations());

module.exports = router;
