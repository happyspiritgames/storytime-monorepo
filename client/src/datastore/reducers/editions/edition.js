import { FETCHED_EDITION_SCENE, SAVED_EDITION } from '../../actions'
import editionScenesReducer from './editionScenes'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_EDITION_SCENE:
      return {
        ...state,
        scenes: editionScenesReducer(state.scenes, action)
      }
    case SAVED_EDITION:
      const { edition } = action.payload
      return {
        ...state,
        ...edition
      }
    default:
      return state
  }
}