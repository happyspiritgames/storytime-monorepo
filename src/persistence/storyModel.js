const fs = require('fs');

exports.getStories = function() {
    const stories = [];
    fs.readdir('./storyRepo', function(err, items) {
        for(let i = 0; i < items.length; i++) {
            const story = fs.load(items[0] + '/story.json');
            stories.push(story);
        }
    });
    return stories;
};

exports.getStory = function(storyKey) {
    console.log('getting story with key:', storyKey);
};
