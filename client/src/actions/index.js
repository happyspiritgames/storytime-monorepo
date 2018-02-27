import { LOAD_SUMMARY, LOAD_SCENE, VISIT_SCENE } from './types'

export const loadSummary = (summary) => ({
  type: LOAD_SUMMARY,
  payload: {
    summary
  }
})

export const loadScene = (scene) => ({
  type: LOAD_SCENE,
  payload: {
    scene
  }
})

export const visitScene = (sceneId) => ({
  type: VISIT_SCENE,
  payload: {
    sceneId
  }
})
