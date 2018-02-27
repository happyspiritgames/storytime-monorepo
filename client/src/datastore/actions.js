export const FETCH_SUMMARY = 'FETCH_SUMMARY'
export const LOAD_SUMMARY = 'LOAD_SUMMARY'
export const FETCH_SCENE = 'FETCH_SCENE'
export const LOAD_SCENE = 'LOAD_SCENE'
export const BEGIN_STORY = 'BEGIN'
export const VISIT_SCENE = 'VISIT_SCENE'

// action creators that return actions with payloads

export const fetchSummary = (storyId) => ({
  type: FETCH_SUMMARY,
  payload: {
    storyId
  }
})

export const loadSummary = (summary) => ({
  type: LOAD_SUMMARY,
  payload: {
    summary
  }
})

export const fetchScene = (sceneId) => ({
  type: FETCH_SCENE,
  payload: {
    sceneId
  }
})

export const loadScene = (scene) => ({
  type: LOAD_SCENE,
  payload: {
    scene
  }
})

export const beginStory = () => ({
  type: BEGIN_STORY
})

export const visitScene = (sceneId) => ({
  type: VISIT_SCENE,
  payload: {
    sceneId
  }
})
