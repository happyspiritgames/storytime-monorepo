import {
  LOADED_DRAFT,
  SAVED_DRAFT_SCENE,
  LOADED_DRAFT_SCENE,
  LOADED_DRAFT_SIGNPOST,
  SAVED_DRAFT_SIGNPOST
} from '../../actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
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
    case LOADED_DRAFT_SIGNPOST:
    case SAVED_DRAFT_SIGNPOST:
      const { sceneId, signpost } = action.payload
      const sceneToChange = state[sceneId]
      if (!sceneToChange) {
        return state
      }
      const nextScene = {
        ...sceneToChange,
        signpost
      }
      return {
        ...state,
        [nextScene.sceneId]: nextScene
      }
    default:
      return state
  }
}