import { getHeaders } from '../util/authentication'

const draftStoriesBaseURI = '/api/draft-stories'

export const fetchDraftStories = (handleDraftStories, handleError) => {
  console.log('called getDraftStories')
  fetch(draftStoriesBaseURI, { headers: getHeaders() })
    .then(res => res.json())
    .then(stories => handleDraftStories(stories))
    .catch(error => handleError(error))
}

export const fetchFullDraft = (storyId, handleDraft, handleError) => {
  console.log('fetchFullDraft', storyId)
  fetch(`${draftStoriesBaseURI}/${storyId}/full`, { headers: getHeaders() })
    .then(res => res.json())
    .then(draft => handleDraft(draft))
    .catch(error => handleError(error))
}

export const createDraft = (draftSummary, handleResponse, handleError) => {
  console.log('createDraft: summary', draftSummary)
  const postOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(draftSummary)
  }
  fetch(draftStoriesBaseURI, postOptions)
    .then(res => res.json())
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(error => handleError(error))
}

export const updateDraft = (draftSummary, handleResponse, handleError) => {
  console.log('updateDraft: summary', draftSummary)
  const putOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(draftSummary)
  }
  fetch(`${draftStoriesBaseURI}/${draftSummary.storyId}`, putOptions)
    .then(res => res.json())
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(error => handleError(error))
}
