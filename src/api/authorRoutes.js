const express = require('express');
const draftController = require('./draftStoryController');

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
.get(draftController.getDraftSummaries)
.post(draftController.beginNewStory);

// for working with latest draft of a particular story
router.route('/stories/:storyId')
.get(draftController.getStorySummary)
.put(draftController.updateStorySummary);

// returns the complete story, including the summary and all scenes;
// payload could be quite large, good for initial load and when client gets out of sync
router.route('/stories/:storyId/full')
.get(draftController.getFullStory);

// for working with scenes of draft story
router.route('/stories/:storyId/scenes').post(draftController.beginNewScene);  // to support alternate workflow where scenes are wired up afterward
router.route('/stories/:storyId/scenes/:sceneId')
.get(draftController.getScene)
.put(draftController.updateScene)
.delete(draftController.deleteScene);

router.route('/stories/:storyId/signpost')
.get(draftController.getSignpost)
.put(draftController.updateSignpost);

module.exports = router;
