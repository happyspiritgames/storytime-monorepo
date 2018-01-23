const localPersistence = require('./storyRepo');

exports.getRecommendedStories = (maxResults = 10) => {
  const summaries = localPersistence.loadStorySummaries();
  const published = summaries.filter(summary => summary.publishedAt);
  if (!published || published.length === 0) {
    console.log('Found 0 published stories', published);
  }
  return published;
};

exports.getPublishedStorySummary = (storyKey) => {
  const story = localPersistence.loadStory(storyKey);
  if (story === undefined) {
    console.log('Did not find story with storyKey=', storyKey);
    return null;
  }
  return story.summary;
};

exports.getStoryScene = (storyKey, sceneKey) => {
  const story = localPersistence.loadStory(storyKey);
  if (story === undefined) {
    console.log('Did not find story with storyKey=', storyKey, 'sceneKey=', sceneKey);
    return null;
  }
  return story.scenes[sceneKey];
};
