'use strict';
module.exports = function(app) {
    var storyController = require('../controllers/storyController');

    // todoList Routes
    app.route('/stories')
        .get(storyController.listStories);
//        .post(todoList.createStory);


    app.route('/stories/:storyId')
        .get(storyController.getStory);
        // .put(storyController.updateStory)
        // .delete(storyController.deleteStory);
};
