import { FETCHED_EDITION_SCENE } from '../../actions'
import scenesReducer from './scenes'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_EDITION_SCENE:
      return {
        ...state,
        scenes: scenesReducer(state.scenes, action)
      }
    default:
      return state
  }
}