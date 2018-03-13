import { getHeaders } from '../util/authentication'

export const getDraftStories = (handleDraftStories, handleErrors) => {
  console.log('called getDraftStories')
  fetch('/api/draft-stories', { headers: getHeaders() })
    .then(res => res.json())
    .then(stories => handleDraftStories(stories))
    .catch(err => handleErrors(err))
}
