import { LOAD_CATALOG, LOAD_SUMMARY } from '../actions'

export const libraryStates = {
  READY: 'READY',
  FETCHING: 'FETCHING'
}

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUMMARY:
      const summary = action.payload.summary
      return {
        ...state,
        [summary.storyId]: summary
      }
    case LOAD_CATALOG:
      if (!action.payload.summaries) {
        return state
      }
      let newSummaries = {}
      action.payload.summaries.forEach(summary => {
        newSummaries[summary.storyId] = summary
      })
      return {
        ...newSummaries
      }
    default:
      return state
  }
}