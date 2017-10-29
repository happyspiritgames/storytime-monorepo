"use strict";

var fs = require('fs');

exports.getStories = function() {
    console.log('looking for stories');
    var stories = [];
    fs.readdir('./storyRepo', function(err, items) {
        console.log('found:', items);
    });
};

exports.getStory = function(storyKey) {
    console.log('getting story with key:', storyKey);
};
