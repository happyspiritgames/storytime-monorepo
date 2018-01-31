import { getHeaders } from '../util/authentication';

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

export const getRoles = (processResponse) => {
  fetch('/api/players/self/roles', { headers: getHeaders() })
    .then(res => res.json())
    .then(roles => processResponse(roles))
    .catch(err => console.log('Failed to get player\'s roles', err));
};

export const getProfile = (processResponse) => {
  fetch('/api/players/self/profile', { headers: getHeaders() })
    .then(res => res.json())
    .then(profile => processResponse(profile))
    .catch(err => console.log('Failed to get player\'s own profile', err));
};

export const updateProfile = (profileUpdates, processResponse) => {
  console.log('updateProfile: sending updates', profileUpdates);
  const putOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(profileUpdates)
  };
  fetch('/api/players/self/profile', putOptions)
    .then(res => res.json())
    .then(message => processResponse(message))
    .catch(err => console.log('Failed to update player profile', err));
};

export const getPlayerStatusCodes = (processStatuses) => {
  fetch('/api/statuses', { headers: getHeaders() })
    .then(res => res.json())
    .then(statuses => processStatuses(statuses))
    .catch(err => console.log('Failed to get player status codes', err));
}