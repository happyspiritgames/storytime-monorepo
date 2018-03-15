import * as authorApi from '../../apis/authorApi'

export const FETCH_DRAFTS = 'FETCH_DRAFTS'
export const fetchDrafts = () => ({
  type: FETCH_DRAFTS
})

export const FETCHED_DRAFTS = 'FETCHED_DRAFTS'
export const fetchedDrafts = (draftSummaries) => ({
  type: FETCHED_DRAFTS,
  payload: {
    drafts: draftSummaries
  }
})

export const FETCH_DRAFTS_FAILED = 'FETCH_DRAFTS_FAILED'
export const fetchDraftsFailed = (error) => ({
  type: FETCH_DRAFTS_FAILED,
  payload: {
    error
  },
  error: true
})

export const retrieveDraftProjects = () => {
  return (dispatch) => {
    dispatch(fetchDrafts())
    authorApi.fetchDraftStories(
      stories => dispatch(fetchedDrafts(stories)),
      error => dispatch(fetchDraftsFailed(error))
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
export const savedDraftScene = (storyId, nextScene) => ({
  type: SAVED_DRAFT_SCENE,
  payload: {
    storyId,
    nextScene
  }
})

export const SAVE_DRAFT_SCENE_FAILED = 'SAVE_DRAFT_SCENE_FAILED'
export const saveDraftSceneFailed = error => ({
  type: SAVE_DRAFT_SCENE_FAILED,
  payload: {
    error
  },
  error: true
})

export const saveDraftSceneSummary = (storyId, draftScene) => {
  return (dispatch) => {
    dispatch(saveDraftScene())
    const saveAPI = (draftScene.sceneId) ? authorApi.updateDraftScene : authorApi.createDraftScene
    saveAPI(storyId, draftScene,
      nextScene => dispatch(savedDraftScene(storyId, nextScene)),
      error => dispatch(saveDraftSceneFailed(error))
    )
  }
}

export const LOAD_DRAFT_SCENE = 'LOAD_DRAFT_SCENE'
export const loadDraftScene = () => ({
  type: LOAD_DRAFT_SCENE
})

export const LOADED_DRAFT_SCENE = 'LOADED_DRAFT_SCENE'
export const loadedDraftScene = (storyId, scene) => ({
  type: LOADED_DRAFT_SCENE,
  payload: {
    storyId,
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
export const loadedDraftSignpost = (storyId, sceneId, signpost) => ({
  type: LOADED_DRAFT_SIGNPOST,
  payload: {
    storyId,
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
      signpost => dispatch(loadedDraftSignpost(storyId, sceneId, signpost)),
      error => dispatch(loadDraftSignpostFailed(error))
    )
  }
}

export const UPDATE_DRAFT_SIGNPOST = 'UPDATE_DRAFT_SIGNPOST'
export const updateDraftSignpost = () => ({
  type: UPDATE_DRAFT_SIGNPOST
})

export const UPDATED_DRAFT_SIGNPOST = 'UPDATED_DRAFT_SIGNPOST'
export const updatedDraftSignpost = (storyId, sceneId, signpost) => ({
  type: UPDATED_DRAFT_SIGNPOST,
  payload: {
    storyId,
    sceneId,
    signpost
  }
})

export const UPDATE_DRAFT_SIGNPOST_FAILED = 'UPDATE_DRAFT_SIGNPOST_FAILED'
export const updateDraftSignpostFailed = (error) => ({
  type: UPDATE_DRAFT_SIGNPOST_FAILED,
  payload: {
    error
  },
  error: true
})

export const saveDraftSignpost = (storyId, sceneId) => {
  return (dispatch) => {
    dispatch(updateDraftSignpost())
    authorApi.updateDraftSignpost(storyId, sceneId,
      signpost => dispatch(updatedDraftSignpost(storyId, sceneId, signpost)),
      error => dispatch(updateDraftSignpostFailed(error))
    )
  }
}
