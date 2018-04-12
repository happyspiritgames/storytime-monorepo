import { LIBRARY_FETCHING, LIBRARY_READY, FETCHED_EDITIONS, FETCHED_EDITION } from '../../actions'
import catalogReducer from './catalog'

export const libraryStates = {
  READY: 'READY',
  FETCHING: 'FETCHING'
}

export const initialState = {
  status: libraryStates.READY,
  isLoaded: false,
  catalog: catalogReducer(undefined, {})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LIBRARY_FETCHING:
      return {
        ...state,
        status: libraryStates.FETCHING,
      }
    case LIBRARY_READY:
      return {
        ...state,
        status: libraryStates.READY
      }
    case FETCHED_EDITIONS:
      return {
        ...state,
        catalog: catalogReducer(state.catalog, action),
        isLoaded: true
      }
    case FETCHED_EDITION:
      return {
        ...state,
        catalog: catalogReducer(state.catalog, action),
        isLoaded: true
      }
    default:
      return state
  }
}