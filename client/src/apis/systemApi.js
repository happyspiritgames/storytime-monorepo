// TODO get codes

const codesBaseURI = '/api/codes'

const fetchCodes = (type, handleResponse, handleError) => {
  console.log('fetchCodes')
  fetch(`${codesBaseURI}/${type}`)
    .then(res => res.json())
    .then(response => handleResponse(type, response))
    .catch(error => handleError(error))
}

export const fetchGenreCodes = (handleResponse, handleError) => {
  fetchCodes('genre', handleResponse, handleError)
}

export const fetchPlayerStatusCodes = (handleResponse, handleError) => {
  fetchCodes('player-status', handleResponse, handleError)
}

export const fetchRatingCodes = (handleResponse, handleError) => {
  fetchCodes('rating', handleResponse, handleError)
}
