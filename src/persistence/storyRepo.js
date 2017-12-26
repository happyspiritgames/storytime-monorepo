const localPersistence = require('./persistToLocalFile');

const sampleStory1 = {
  summary: {
    storyKey: 'sampleStory1',
    title: 'Sample Story 1',
    penName: 'Betty Wrightsalot',
    tagLine: 'Best darn story this side of yesterday',
    about: 'This is something you really want to read.  Let me tell you why it\'s so good.',
    firstSceneKey: 'scene001',
    publishedAt: '2017-11-11T22:23:54.396Z'
  },
  scenes: {
    scene001: {
      sceneKey: 'scene001',
      title: 'It All Starts Here',
      prose: 'Our story begins in a small town on the outskirts of civilization.',
      signPost: {
        prompt: 'Choose what to do next',
        options: [
          {
            sceneKey: 'scene002',
            teaser: 'Take the conservative approach.  You can never be too careful.'
          },
          {
            sceneKey: 'scene003',
            teaser: 'Go crazy.  You only live once, you know.'
          }
        ]
      }
    },
    scene002: {
      key: 'scene002',
      title: 'Well, That Was Boring',
      prose: 'You live a safe life and eventually die alone in front of your fireplace.',
      signPost: []
    },
    scene003: {
      key: 'scene003',
      title: 'Wow, That Was Exciting',
      prose: 'You do lots of exciting things until that one adventure where you fell off a cliff and die.',
      signPost: []
    },
  }
};

exports.getRecommendedStories = (maxResults = 10) => {
  return localPersistence.loadStorySummaries();
};

exports.getPublishedStorySummary = (storyKey) => {
  const story = localPersistence.loadStory(storyKey);
  if (story) {
    return story.summary;
  }
  return sampleStory1.summary;  // for now make sure something comes out
};

exports.getStoryScene = (storyKey, sceneKey) => {
  const story = localPersistence.loadStory(storyKey);
  if (story) {
    return story.scenes[sceneKey];
  }
  return sampleStory1.scenes[sampleStory1.summary.firstScene];  // for now make sure something comes out
};
