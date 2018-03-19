import { getHeaders } from '../util/authentication'

const draftStoriesBaseURI = '/api/draft-stories'

export const fetchDraftStories = (handleResponse, handleError) => {
  console.log('called getDraftStories')
  const fetchOptions = { headers: getHeaders() }
  fetch(draftStoriesBaseURI, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const fetchFullDraft = (storyId, handleResponse, handleError) => {
  console.log('fetchFullDraft', storyId)
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/full`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const createDraft = (draftSummary, handleResponse, handleError) => {
  console.log('createDraft: summary', draftSummary)
  const fetchOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(draftSummary)
  }
  fetch(draftStoriesBaseURI, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const updateDraft = (draftSummary, handleResponse, handleError) => {
  console.log('updateDraft: summary', draftSummary)
  const fetchOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(draftSummary)
  }
  fetch(`${draftStoriesBaseURI}/${draftSummary.storyId}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const fetchDraftScene = (storyId, sceneId, handleResponse, handleError) => {
  console.log('fetchDraftScene', storyId, sceneId)
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${sceneId}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const createDraftScene = (storyId, draftScene, handleResponse, handleError) => {
  console.log('createDraftScene: summary', draftScene)
  const fetchOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(draftScene)
  }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const updateDraftScene = (storyId, draftScene, handleResponse, handleError) => {
  console.log('updateDraftScene: summary', draftScene)
  const fetchOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(draftScene)
  }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${draftScene.sceneId}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const fetchDraftSignpost = (storyId, sceneId, handleResponse, handleError) => {
  console.log('fetchDraftSignpost', storyId, sceneId)
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${sceneId}/signpost`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const updateDraftSignpost = (storyId, sceneId, signpostChanges, handleResponse, handleError) => {
  console.log('updateDraftSignpost: summary', storyId, sceneId, signpostChanges)
  const fetchOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(signpostChanges)
  }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${sceneId}/signpost`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const publish = (storyId, handleResponse, handleError) => {
  console.log('implementing publish in the next release')
}