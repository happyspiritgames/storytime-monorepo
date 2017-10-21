"use strict";

var fs = require('fs');

exports.getStories = function() {
    console.log('looking for stories');
    var stories = [];
    fs.readdir('./storyRepo', function(err, items) {
        for(var i = 0; i < items.length; i++) {
            var story = fs.load(items[0] + '/story.json');
            stories.push(story);
        }
    });
    return stories;
};

exports.getStory = function(storyKey) {
    console.log('getting story with key:', storyKey);
};
