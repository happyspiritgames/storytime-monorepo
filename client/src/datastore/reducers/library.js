import { LIBRARY_FETCHING, LIBRARY_READY, FETCHED_CATALOG } from '../actions'

export const libraryStates = {
  READY: 'READY',
  FETCHING: 'FETCHING'
}

export const initialState = {
  status: libraryStates.READY,
  catalog: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LIBRARY_FETCHING:
      return {
        ...state,
        status: libraryStates.FETCHING
      }
    case LIBRARY_READY:
      return {
        ...state,
        status: libraryStates.READY
      }
    case FETCHED_CATALOG:
    default:
      return state
  }
}