export const getStorySummaries = (processResponse) => {
    fetch('/api/stories')
        .then(res => res.json())
        .then(summaries => processResponse(summaries))
        .catch(err => console.log('Failed to find stories.', err));
};

export const getSummary = (storyKey, processResponse) => {
    fetch(`/api/stories/${storyKey}`)
        .then(res => res.json())
        .then(summaries => processResponse(summaries))
        .catch(err => console.log('Failed to find story with key:', storyKey, err));
};

export const getScene = (storyKey, sceneKey, processResponse) => {
    fetch(`/api/stories/${storyKey}/scenes/${sceneKey}`)
        .then(res => res.json())
        .then(summaries => processResponse(summaries))
        .catch(err => console.log('Failed to find story with key:', storyKey, err));
};
