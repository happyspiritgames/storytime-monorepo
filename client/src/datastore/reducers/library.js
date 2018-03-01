import { FETCH_CATALOG, LOAD_CATALOG } from '../actions'

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
    case FETCH_CATALOG:
      return {
        ...state,
        status: libraryStates.FETCHING
      }
    case LOAD_CATALOG:
      const storyIds = (!action.payload.summaries) ? []
        : action.payload.summaries.map(summary => (summary.storyId))
      return {
        ...state,
        catalog: storyIds,
        status: libraryStates.READY
      }
    default:
      return state
  }
}