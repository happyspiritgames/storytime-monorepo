import * as authorApi from '../../apis/authorApi'

export const LOAD_DRAFTS = 'LOAD_DRAFTS'
export const loadDrafts = () => ({
  type: LOAD_DRAFTS
})

export const LOADED_DRAFTS = 'LOADED_DRAFTS'
export const loadedDrafts = (draftSummaries) => ({
  type: LOADED_DRAFTS,
  payload: {
    drafts: draftSummaries
  }
})

export const LOAD_DRAFTS_FAILED = 'LOAD_DRAFTS_FAILED'
export const loadDraftsFailed = (error) => ({
  type: LOAD_DRAFTS_FAILED,
  payload: {
    error
  },
  error: true
})

export const retrieveDraftProjects = () => {
  return (dispatch) => {
    dispatch(loadDrafts())
    authorApi.fetchDraftStories(
      stories => dispatch(loadedDrafts(stories)),
      error => dispatch(loadDraftsFailed(error))
    )
  }
}

export const START_NEW_DRAFT = 'START_NEW_DRAFT'
export const startNewDraft = () => ({
  type: START_NEW_DRAFT
})

export const SAVE_DRAFT = 'SAVE_DRAFT'
export const saveDraft = () => ({
  type: SAVE_DRAFT
})

export const SAVED_DRAFT = 'SAVED_DRAFT'
export const savedDraft = nextDraft => ({
  type: SAVED_DRAFT,
  payload: {
    nextDraft
  }
})

export const SAVE_DRAFT_FAILED = 'SAVE_DRAFT_FAILED'
export const saveDraftFailed = error => ({
  type: SAVE_DRAFT_FAILED,
  payload: {
    error
  },
  error: true
})

export const saveDraftSummary = (draftSummary) => {
  return (dispatch) => {
    dispatch(saveDraft())
    const saveAPI = (draftSummary.storyId) ? authorApi.updateDraft : authorApi.createDraft
    saveAPI(draftSummary,
      nextSummary => dispatch(savedDraft(nextSummary)),
      error => dispatch(saveDraftFailed(error))
    )
  }
}

export const LOAD_DRAFT = 'LOAD_DRAFT'
export const loadDraft = () => ({
  type: LOAD_DRAFT
})

export const LOADED_DRAFT = 'LOADED_DRAFT'
export const loadedDraft = (draft) => ({
  type: LOADED_DRAFT,
  payload: {
    draft
  }
})

export const LOAD_DRAFT_FAILED = 'LOAD_DRAFT_FAILED'
export const loadDraftFailed = (error) => ({
  type: LOAD_DRAFT_FAILED,
  payload: {
    error
  },
  error: true
})

export const retrieveDraft = (storyId) => {
  return (dispatch) => {
    dispatch(loadDraft())
    authorApi.fetchFullDraft(storyId,
      draft => dispatch(loadedDraft(draft)),
      error => dispatch(loadDraftFailed(error))
    )
  }
}

export const SAVE_DRAFT_SCENE = 'SAVE_DRAFT_SCENE'
export const saveDraftScene = () => ({
  type: SAVE_DRAFT_SCENE
})

export const SAVED_DRAFT_SCENE = 'SAVED_DRAFT_SCENE'
export const savedDraftScene = (scene) => ({
  type: SAVED_DRAFT_SCENE,
  payload: {
    scene
  }
})

export const SAVE_DRAFT_SCENE_FAILED = 'SAVE_DRAFT_SCENE_FAILED'
export const saveDraftSceneFailed = (error) => ({
  type: SAVE_DRAFT_SCENE_FAILED,
  payload: {
    error
  },
  error: true
})

export const updateDraftScene = (storyId, draftScene) => {
  return (dispatch) => {
    dispatch(saveDraftScene())
    const saveAPI = (draftScene.sceneId) ? authorApi.updateDraftScene : authorApi.createDraftScene
    saveAPI(storyId, draftScene,
      nextScene => dispatch(savedDraftScene(nextScene)),
      error => dispatch(saveDraftSceneFailed(error))
    )
  }
}

export const LOAD_DRAFT_SCENE = 'LOAD_DRAFT_SCENE'
export const loadDraftScene = () => ({
  type: LOAD_DRAFT_SCENE
})

export const LOADED_DRAFT_SCENE = 'LOADED_DRAFT_SCENE'
export const loadedDraftScene = (scene) => ({
  type: LOADED_DRAFT_SCENE,
  payload: {
    scene
  }
})

export const LOAD_DRAFT_SCENE_FAILED = 'LOAD_DRAFT_SCENE_FAILED'
export const loadDraftSceneFailed = (error) => ({
  type: LOAD_DRAFT_SCENE_FAILED,
  payload: {
    error
  },
  error: true
})

export const retrieveDraftScene = (storyId, sceneId) => {
  return (dispatch) => {
    dispatch(loadDraftScene())
    authorApi.fetchDraftScene(storyId, sceneId,
      scene => dispatch(loadedDraftScene(storyId, scene)),
      error => dispatch(loadDraftSceneFailed(error))
    )
  }
}

export const LOAD_DRAFT_SIGNPOST = 'LOAD_DRAFT_SIGNPOST'
export const loadDraftSignpost = () => ({
  type: LOAD_DRAFT_SIGNPOST
})

export const LOADED_DRAFT_SIGNPOST = 'LOADED_DRAFT_SIGNPOST'
export const loadedDraftSignpost = (sceneId, signpost) => ({
  type: LOADED_DRAFT_SIGNPOST,
  payload: {
    sceneId,
    signpost
  }
})

export const LOAD_DRAFT_SIGNPOST_FAILED = 'LOAD_DRAFT_SIGNPOST_FAILED'
export const loadDraftSignpostFailed = (error) => ({
  type: LOAD_DRAFT_SIGNPOST_FAILED,
  payload: {
    error
  },
  error: true
})

export const retrieveDraftSignpost = (storyId, sceneId) => {
  return (dispatch) => {
    dispatch(loadDraftSignpost())
    authorApi.fetchDraftSignpost(storyId, sceneId,
      signpost => dispatch(loadedDraftSignpost(sceneId, signpost)),
      error => dispatch(loadDraftSignpostFailed(error))
    )
  }
}

export const SAVE_DRAFT_SIGNPOST = 'SAVE_DRAFT_SIGNPOST'
export const saveDraftSignpost = () => ({
  type: SAVE_DRAFT_SIGNPOST
})

export const SAVED_DRAFT_SIGNPOST = 'SAVED_DRAFT_SIGNPOST'
export const savedDraftSignpost = (sceneId, signpost) => ({
  type: SAVED_DRAFT_SIGNPOST,
  payload: {
    sceneId,
    signpost
  }
})

export const SAVE_DRAFT_SIGNPOST_FAILED = 'SAVE_DRAFT_SIGNPOST_FAILED'
export const saveDraftSignpostFailed = (error) => ({
  type: SAVE_DRAFT_SIGNPOST_FAILED,
  payload: {
    error
  },
  error: true
})

export const updateDraftSignpost = (storyId, sceneId, signpostUpdates) => {
  return (dispatch) => {
    dispatch(saveDraftSignpost())
    authorApi.updateDraftSignpost(storyId, sceneId, signpostUpdates,
      signpost => dispatch(savedDraftSignpost(sceneId, signpost)),
      error => dispatch(saveDraftSignpostFailed(error))
    )
  }
}
