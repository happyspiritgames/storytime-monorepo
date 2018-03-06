import { FETCHED_CATALOG, FETCHED_SUMMARY, FETCHED_SCENE, fetchedSummary } from '../actions'
import storyReducer from './story'

export const initialState = {}

export default (state = initialState, action) => {
  let story, storyId
  switch (action.type) {
    case FETCHED_SUMMARY:
      const summary = action.payload.summary
      const storyState = state[summary.storyId]
      return {
        ...state,
        [summary.storyId]: storyReducer(storyState, action)
      }
    case FETCHED_SCENE:
      storyId = action.payload.storyId
      story = state[storyId]
      return {
        ...state,
        [storyId]: storyReducer(story, action)
      }
    case FETCHED_CATALOG:
      if (!action.payload.summaries) {
        return state
      }

      // TODO fix this -- stop clobbering cached

      let nextStories = {}
      action.payload.summaries.forEach(summary => {
        const storyState = state[summary.storyId] || {}
        nextStories = {
          ...nextStories,
          [summary.storyId]: storyReducer(storyState, fetchedSummary(summary))
        }
      })
      return {
        ...story,
        ...nextStories
      }
    default:
      return state
  }
}