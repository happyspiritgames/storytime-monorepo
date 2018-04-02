import { getHeaders } from '../util/authentication'

const draftStoriesBaseURI = '/api/draft-stories'

export const prepareToPublish = (draftId, handleResponse, handleError) => {
  console.log('publishApi.prepareToPublish', draftId)
  const fetchOptions = {
    method: 'POST',
    headers: getHeaders()
  }
  // TODO handle 304
  fetch(`${draftStoriesBaseURI}/${draftId}/proofs`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const getProofs = (draftId, handleResponse, handleError) => {
  console.log('publishApi.getProofs')
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${draftId}/proofs`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const getProof = (draftId, version, handleResponse, handleError) => {
  console.log('publishApi.getProof')
  const fetchOptions = { headers: getHeaders() }
  fetch(`${draftStoriesBaseURI}/${draftId}/proofs/${version}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const updateProof = (draftId, version, updates, handleResponse, handleError) => {
  console.log('publishApi.updateProof', draftId, version, updates)
  const fetchOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updates)
  }
  fetch(`${draftStoriesBaseURI}/${draftId}/proofs/${version}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}

export const publish = (draftId, version, handleResponse, handleError) => {
  console.log('publishApi.publish', draftId)
  const fetchOptions = {
    method: 'POST',
    headers: getHeaders()
  }
  fetch(`${draftStoriesBaseURI}/${draftId}/proofs/${version}`, fetchOptions)
    .then(res => res.json())
    .then(response => handleResponse(response))
    .catch(error => handleError(error))
}
