const repo = require('../persistence/storyRepo');

exports.ping = (req, res) => {
  console.log('ping');
  res.send({ salutation: 'pong' });
};

exports.searchStories = (req, res) => {
  console.log('searchStories');
  res.send(repo.getRecommendedStories());
};

exports.getPublishedStorySummary = (req, res) => {
  const {storyKey} = req.params;
  console.log('getPublishedStorySummary', `storyKey=${storyKey}`);
  const story = repo.getPublishedStorySummary(storyKey);
  res.format({
      'application/json': () => {
        "use strict";
          res.send(story);
      },

      'default': () => {
        "use strict";
        res.status(406).send('Not Acceptable');
      }
  });
};

exports.getStoryScene = (req, res) => {
  const {storyKey, sceneKey} = req.params;
  console.log('getStoryScene', `storyKey=${storyKey}`, `sceneKey=${sceneKey}`);
  res.format({
      'application/json': () => {
          "use strict";
          res.send(repo.getStoryScene(storyKey, sceneKey));
      },

      'default': () => {
          "use strict";
          res.status(406).send('Not Acceptable');
      }
  });
};
