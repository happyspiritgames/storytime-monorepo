import { FETCHED_SUMMARY, FETCHED_SCENE } from '../actions'
import scenesReducer from './scenes'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_SUMMARY:
      const summary = action.payload.summary
      return {
        ...state,
        summary
      }
    case FETCHED_SCENE:
      return {
        ...state,
        scenes: scenesReducer(state.scenes, action)
      }
    default:
      return state
  }
}