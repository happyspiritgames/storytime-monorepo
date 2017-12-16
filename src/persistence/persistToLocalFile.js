const fs = require('fs');

const repoDir = './storyRepo';

exports.loadStory = (storyKey) => {
  "use strict";
  const storyFilePath = `${repoDir}/${storyKey}/story.json`;
  const found = fs.existsSync(storyFilePath);
  console.log('story w/ key', storyKey, 'was', found ? 'found at' : 'not found at', storyFilePath);
  if (found) {
    const json = fs.readFileSync(storyFilePath, "utf8");
    return JSON.parse(json);
  }
};

exports.loadStorySummaries = () => {
  "use strict";
  const storyDirs = fs.readdirSync(repoDir);
  return storyDirs.map(dir => {
    const story = this.loadStory(dir);
    return story.summary;
  });
};