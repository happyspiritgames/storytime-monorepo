export const getCatalog = () => {
    console.log('getCatalog');
    return fetch('/api/stories')
        .then(response => {
            return response.json;
        });
};

// export const getStoryInfo = (storyKey) => {
//     console.log('requesting story for key', storyKey);
//     return storySummaryMock;
// };
//
// export const getScene = (storyKey, sceneKey) => {
//     console.log('requesting scene', sceneKey, 'for story', storyKey);
//     return sceneMock[sceneKey];
// };
