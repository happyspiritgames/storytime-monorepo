import { FETCHED_CATALOG, FETCHED_SUMMARY, FETCHED_SCENE } from '../actions'
import storyReducer from './story'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_SUMMARY:
      const summary = action.payload.summary
      const storyState = state[summary.storyId]
      return {
        ...state,
        [summary.storyId]: storyReducer(storyState, action)
      }
    case FETCHED_SCENE:
      const { storyId } = action.payload
      const story = state[storyId]
      return {
        ...state,
        [storyId]: storyReducer(story, action)
      }
    case FETCHED_CATALOG:
      if (!action.payload.summaries) {
        return state
      }
      let newSummaries = {}
      action.payload.summaries.forEach(summary => {
        newSummaries[summary.storyId] = {
          summary
        }
      })
      return {
        ...newSummaries
      }
    default:
      return state
  }
}