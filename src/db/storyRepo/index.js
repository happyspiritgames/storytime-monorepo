const fs = require('fs');

const repoDir = './storyRepo';

exports.loadStory = storyId => {
  "use strict";
  const storyFilePath = `${repoDir}/${storyId}/story.json`;
  const found = fs.existsSync(storyFilePath);
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
