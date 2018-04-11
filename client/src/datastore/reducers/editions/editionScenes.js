import { FETCHED_EDITION_SCENE } from '../../actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_EDITION_SCENE:
      const { scene } = action.payload
      return {
        ...state,
        [scene.sceneId]: scene
      }
    default:
      return state
  }
}