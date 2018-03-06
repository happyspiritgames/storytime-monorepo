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
      const catalogStoryIds = (!action.payload.summaries) ? []
        : action.payload.summaries.map(summary => (summary.storyId))
      return {
        ...state,
        catalog: catalogStoryIds
      }
    default:
      return state
  }
}