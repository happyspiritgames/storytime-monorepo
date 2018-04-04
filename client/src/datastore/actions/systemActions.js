import * as systemApi from '../../apis/systemApi'

export const FETCH_CODES = 'FETCH_CODES'
export const fetchCodes = () => ({
  type: FETCH_CODES
})

export const FETCHED_CODES = 'FETCHED_CODES'
export const fetchedCodes = (type, codes) => ({
  type: FETCHED_CODES,
  payload: {
    type,
    codes
  }
})

export const FETCH_CODES_FAILED = 'FETCH_CODES_FAILED'
export const fetchCodesFailed = (error) => ({
  type: FETCH_CODES_FAILED,
  payload: {
    error
  },
  error: true
})

export const loadGenreCodes = () => {
  return (dispatch) => {
    dispatch(fetchCodes())
    systemApi.fetchGenreCodes(
      (type, codes) => dispatch(fetchedCodes(type, codes)),
      error => dispatch(fetchCodesFailed(error))
    )
  }
}

export const loadRatingCodes = () => {
  return (dispatch) => {
    dispatch(fetchCodes())
    systemApi.fetchRatingCodes(
      (type, codes) => dispatch(fetchedCodes(type, codes)),
      error => dispatch(fetchCodesFailed(error))
    )
  }
}

export const loadPlayerStatusCodes = () => {
  return (dispatch) => {
    dispatch(fetchCodes())
    systemApi.fetchPlayerStatusCodes(
      (type, codes) => dispatch(fetchedCodes(type, codes)),
      error => dispatch(fetchCodesFailed(error))
    )
  }
}
