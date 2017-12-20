export const getCatalog = () => {
    return fetch('/api/stories')
        .then(response => {
            return response.json;
        });
};

export const getStoryInfo = (storyKey) => {
    return fetch(`/api/stories/${storyKey}`)
        .then(response => {
            return response.json;
        });
};

export const getScene = (storyKey, sceneKey) => {
    return fetch(`/api/stories/${storyKey}/scenes/${sceneKey}`)
        .then(response => {
            return response.json;
        });
};
