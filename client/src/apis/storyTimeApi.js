import { getHeaders } from '../util/authentication'

export const getStorySummaries = (processResponse) => {
  fetch('/api/stories')
    .then(res => res.json())
    .then(summaries => processResponse(summaries))
    .catch(err => console.log('Failed to find stories.', err))
}

export const getSummary = (storyKey, processResponse) => {
  fetch(`/api/stories/${storyKey}`)
    .then(res => res.json())
    .then(summaries => processResponse(summaries))
    .catch(err => console.log('Failed to find story with key:', storyKey, err))
}

export const getScene = (storyKey, sceneKey, processResponse) => {
  fetch(`/api/stories/${storyKey}/scenes/${sceneKey}`)
    .then(res => res.json())
    .then(scene => processResponse(scene))
    .catch(err => console.log('Failed to find story with key:', storyKey, err))
}

export const getRoles = (handleResponse, handleError) => {
  fetch('/api/self/roles', { headers: getHeaders() })
    .then(res => res.json())
    .then(roles => handleResponse(roles))
    .catch(err => handleError(err))
}

export const getProfile = (handleResponse, handleError) => {
  fetch('/api/self/profile', { headers: getHeaders() })
    .then(res => res.json())
    .then(profile => handleResponse(profile))
    .catch(err => handleError(err))
}

export const updateProfile = (profileUpdates, handleResponse, handleError) => {
  console.log('updateProfile: sending updates', profileUpdates)
  const putOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(profileUpdates)
  }
  fetch('/api/self/profile', putOptions)
    .then(res => res.json())
    .then(message => handleResponse(message))
    .catch(err => handleError(err))
}

export const getPlayerStatusCodes = (processStatusCodes) => {
  fetch('/api/codes/player-status', { headers: getHeaders() })
    .then(res => res.json())
    .then(statusCodes => processStatusCodes(statusCodes))
    .catch(err => console.log('Failed to get player status codes', err))
}

export const agreeToAuthorTerms = (handleResponse, handleError) => {
  const putOptions = {
    method: 'PUT',
    headers: getHeaders()
  }
  fetch('/api/self/roles/agree-author', putOptions)
    .then(res => handleResponse())
    .then(err => handleError(err))
}