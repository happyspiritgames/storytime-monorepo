import { getHeaders } from '../util/authentication'

export const getPublishedEditions = (handleResponse, handleError) => {
  fetch('/api/stories')
    .then(res => res.json())
    .then(editions => handleResponse(editions))
    .catch(err => handleError(err))
}

export const getEdition = (editionKey, handleResponse, handleError) => {
  fetch(`/api/stories/${editionKey}`)
    .then(res => res.json())
    .then(edition => handleResponse(edition))
    .catch(err => handleError(err))
}

export const getEditionScene = (editionKey, sceneKey, handleResponse, handleError) => {
  fetch(`/api/stories/${editionKey}/scenes/${sceneKey}`)
    .then(res => res.json())
    .then(scene => handleResponse(scene))
    .catch(err => handleError(err))
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