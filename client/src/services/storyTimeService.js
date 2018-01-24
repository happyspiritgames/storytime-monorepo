import { getAccessToken, isLoggedIn } from '../util/authentication';

const getHeaders = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    if (isLoggedIn()) {
        headers.append('Authorization', `Bearer ${getAccessToken()}`);
    }
    return headers;
};

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

export const getProfile = (processResponse) => {
    fetch('/api/players/self/profile',
        { headers: { Authorization: `Bearer ${getAccessToken()}` } })
        .then(res => res.json())
        .then(profile => processResponse(profile))
        .catch(err => console.log('Failed to get player\'s own profile', err));
};

// export const refreshProfile = (processResponse) => {
//     const options = {
//         headers: getHeaders()
//     };
//     fetch('/api/players/self/profile/refresh', options)
//         .then(res => res.json())
//         .then(profile => processResponse(profile))
//         .catch(err => console.log('Failed to get player\'s own profile', err));
// };

export const updateProfile = (profileUpdates, processResponse) => {
    console.log('updateProfile: sending updates', profileUpdates);
    const putOptions = {
        method: 'PUT',
        headers: getHeaders(),
        body: profileUpdates
    };
    fetch('/api/players/self/profile', putOptions)
        .then(res => res.json())
        .then(message => processResponse(message))
        .catch(err => console.log('Failed to update player profile', err));
}