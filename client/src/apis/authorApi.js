import { getHeaders } from '../util/authentication'

export const getDraftStories = (handleDraftStories, handleErrors) => {
  console.log('called getDraftStories')
  fetch('/api/draft-stories', { headers: getHeaders() })
    .then(res => res.json())
    .then(stories => handleDraftStories(stories))
    .catch(err => handleErrors(err))
}

export const createDraft = (draftSummary, handleResponse, handleError) => {
  console.log('createDraft: summary', draftSummary)
  const postOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(draftSummary)
  }
  fetch('/api/draft-stories', postOptions)
    .then(res => res.json())
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(err => handleError(err))
}

export const updateDraft = (draftSummary, handleResponse, handleError) => {
  console.log('updateDraft: summary', draftSummary)
  const putOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(draftSummary)
  }
  fetch(`/api/draft-stories/${draftSummary.storyId}`, putOptions)
    .then(res => res.json())
    .then(summaryResponse => handleResponse(summaryResponse))
    .catch(err => handleError(err))
}
