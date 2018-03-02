import { FETCHED_CATALOG, FETCHED_SUMMARY, FETCHED_SCENE } from '../actions'
import sceneReducer from './scene'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_SUMMARY:
      const summary = action.payload.summary
      return {
        ...state,
        [summary.storyId]: {
          summary
        }
      }
    case FETCHED_SCENE:
      const { storyId } = action.payload
      const scenes = (state[storyId] && state[storyId].scenes)
        ? state[storyId].scenes : {}
      return {
        ...state,
        [storyId]: {
          scenes: sceneReducer(scenes, action)
        }
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