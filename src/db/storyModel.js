const localPersistence = require('./storyRepo');

exports.getRecommendedStories = (maxResults = 10) => {
  const summaries = localPersistence.loadStorySummaries();
  const published = summaries.filter(summary => summary.publishedAt);
  if (published && published.length > 0) {
    return published;
  }
  console.log('No published stories found');
};

exports.getPublishedStorySummary = storyId => {
  const story = localPersistence.loadStory(storyId);
  if (story) {
    return story.summary;
  }
  console.log('Did not find story', storyId);
};

exports.getStoryScene = (storyId, sceneId) => {
  const story = localPersistence.loadStory(storyId);
  if (story) {
    return story.scenes[sceneId];
  }
  console.log('Did not find scene', storyId, sceneId);
};
