import {
  FETCHED_SCENE,
  LOADED_DRAFT,
  SAVED_DRAFT_SCENE,
  LOADED_DRAFT_SCENE
} from '../actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_SCENE:
    case LOADED_DRAFT_SCENE:
    case SAVED_DRAFT_SCENE:
      const { scene } = action.payload
      return {
        ...state,
        [scene.sceneId]: scene
      }

    case LOADED_DRAFT:
      let nextScenes = {}
      if (action.payload.draft.scenes) {
        action.payload.draft.scenes.forEach(scene => {
          nextScenes[scene.sceneId] = scene
        })
      }
      return nextScenes
    default:
      return state
  }
}