const repo = require('./persistence/storyRepo');

exports.ping = (req, res) => {
  res.send({ salutation: 'pong' });
};

exports.searchStories = (req, res) => {
  res.send(repo.getRecommendedStories());
};

exports.getPublishedStorySummary = (req, res) => {
  const {storyKey} = req.params;
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
