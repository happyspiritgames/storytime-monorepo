import { getHeaders } from '../util/authentication'

const draftStoriesBaseURI = '/api/draft-stories'

export const fetchDraftStories = (handleDraftStories, handleError) => {
  console.log('called getDraftStories')
  const fetchOptions = { headers: getHeaders() }
  fetch(draftStoriesBaseURI, fetchOptions)
    .then(res => res.json())
    .then(stories => handleDraftStories(stories))
    .catch(error => handleError(error))
}

export const fetchFullDraft = (storyId, handleDraft, handleError) => {
  console.log('fetchFullDraft', storyId)
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/full`, fetchOptions)
    .then(res => res.json())
    .then(draft => handleDraft(draft))
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
    .then(summaryResponse => handleResponse(summaryResponse))
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
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(error => handleError(error))
}

export const fetchScene = (storyId, sceneId, handleDraft, handleError) => {
  console.log('fetchScene', storyId, sceneId)
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${sceneId}`, fetchOptions)
    .then(res => res.json())
    .then(draft => handleDraft(draft))
    .catch(error => handleError(error))
}

export const createScene = (storyId, draftScene, handleResponse, handleError) => {
  console.log('createScene: summary', draftScene)
  const fetchOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(draftScene)
  }
  fetch(`draftStoriesBaseURI/${storyId}/scenes`, fetchOptions)
    .then(res => res.json())
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(error => handleError(error))
}

export const updateScene = (storyId, draftScene, handleResponse, handleError) => {
  console.log('updateScene: summary', draftScene)
  const fetchOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(draftScene)
  }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${draftScene.sceneId}`, fetchOptions)
    .then(res => res.json())
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(error => handleError(error))
}

export const fetchSignpost = (storyId, sceneId, handleDraft, handleError) => {
  console.log('fetchSignpost', storyId, sceneId)
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${sceneId}/signpost`, fetchOptions)
    .then(res => res.json())
    .then(draft => handleDraft(draft))
    .catch(error => handleError(error))
}

export const updateSignpost = (storyId, sceneId, signpost, handleResponse, handleError) => {
  console.log('updateSignpost: summary', storyId, sceneId, signpost)
  const fetchOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(signpost)
  }
  fetch(`${draftStoriesBaseURI}/${storyId}/scenes/${sceneId}/signpost`, fetchOptions)
    .then(res => res.json())
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(error => handleError(error))
}

export const publish = (storyId, handleResponse, handleError) => {
  console.log('implementing publish in the next release')
}