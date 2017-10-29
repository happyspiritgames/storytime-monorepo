'use strict';

var storyModel = require('../models/storyModel');

exports.listStories = function(req, res) {
    storyModel.getStories();
    res.send('bah');
};

exports.getStory = function(req, res) {
    storyModel.getStory(req.storyKey);
    res.send('bah');
};
