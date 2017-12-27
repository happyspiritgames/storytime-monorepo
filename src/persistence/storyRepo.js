const localPersistence = require('./persistToLocalFile');

exports.getRecommendedStories = (maxResults = 10) => {
  const summaries = localPersistence.loadStorySummaries();
  const published = summaries.filter(summary => summary.publishedAt);
  console.log('found published stories', published);
  return published;
};

exports.getPublishedStorySummary = (storyKey) => {
  const story = localPersistence.loadStory(storyKey);
  if (story === undefined) {
    console.log('did not find story. storyKey=', storyKey);
    return null;
  }
  return story.summary;
};

exports.getStoryScene = (storyKey, sceneKey) => {
  const story = localPersistence.loadStory(storyKey);
  if (story === undefined) {
    console.log('did not find story. storyKey=', storyKey, 'sceneKey=', sceneKey);
    return null;
  }
  return story.scenes[sceneKey];
};
