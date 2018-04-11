import { FETCHED_EDITION_SCENE } from '../../actions'
import editionScenesReducer from './editionScenes'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_EDITION_SCENE:
      return {
        ...state,
        scenes: editionScenesReducer(state.scenes, action)
      }
    default:
      return state
  }
}