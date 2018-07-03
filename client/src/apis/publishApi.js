import { getHeaders } from '../util/authentication'

const draftStoriesBaseURI = '/api/draft-stories'

export const createEdition = (storyId, handleResponse, handleError) => {
  console.log('publishApi.createEdition', storyId)
  const fetchOptions = {
    method: 'POST',
    headers: getHeaders()
  }
  // TODO handle 304
  fetch(`${draftStoriesBaseURI}/${storyId}/editions`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const getEditions = (storyId, handleResponse, handleError) => {
  console.log('publishApi.getEditions')
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/editions`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const getEdition = (storyId, editionKey, handleResponse, handleError) => {
  console.log('publishApi.getEdition')
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/editions/${editionKey}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const updateEdition = (storyId, editionKey, editionUpdates, handleResponse, handleError) => {
  console.log('publishApi.updateEdition', storyId, editionKey, editionUpdates)
  const fetchOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(editionUpdates)
  }
  fetch(`${draftStoriesBaseURI}/${storyId}/editions/${editionKey}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const publish = (storyId, editionKey, handleResponse, handleError) => {
  console.log('publishApi.publish', storyId)
  const fetchOptions = {
    method: 'POST',
    headers: getHeaders()
  }
  fetch(`${draftStoriesBaseURI}/${storyId}/editions/${editionKey}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}
