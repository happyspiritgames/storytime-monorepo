import {
  LOAD_DRAFTS,
  LOADED_DRAFTS,
  LOAD_DRAFTS_FAILED,
  START_NEW_DRAFT,
  SAVE_DRAFT,
  SAVED_DRAFT,
  SAVE_DRAFT_FAILED,
  LOAD_DRAFT,
  LOADED_DRAFT,
  LOAD_DRAFT_FAILED,
  SAVE_DRAFT_SCENE,
  SAVED_DRAFT_SCENE,
  SAVE_DRAFT_SCENE_FAILED,
  LOAD_DRAFT_SCENE,
  LOADED_DRAFT_SCENE,
  LOAD_DRAFT_SCENE_FAILED,
  LOAD_DRAFT_SIGNPOST,
  LOADED_DRAFT_SIGNPOST,
  LOAD_DRAFT_SIGNPOST_FAILED,
  SAVE_DRAFT_SIGNPOST,
  SAVED_DRAFT_SIGNPOST,
  SAVE_DRAFT_SIGNPOST_FAILED
} from '../actions'
import activeDraft from './activeDraft'

export const writingDeskStates = {
  READY: 'READY',
  LOADING: 'LOADING',
  SAVING: 'SAVING'
}

export const initialState = {
  status: writingDeskStates.READY,
  draftProjects: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
    case LOAD_DRAFT:
    case LOAD_DRAFT_SCENE:
    case LOAD_DRAFT_SIGNPOST:
      return {
        ...state,
        status: writingDeskStates.LOADING
      }
    case LOADED_DRAFTS:
      const projectIds = action.payload.drafts.map(draft => draft.storyId)
      return {
        ...state,
        draftProjects: projectIds,
        status: writingDeskStates.READY
      }
    case LOADED_DRAFT:
    case SAVED_DRAFT:
      return {
        ...state,
        activeDraft: activeDraft(state.activeDraft, action),
        status: writingDeskStates.READY
      }
    case SAVE_DRAFT:
    case SAVE_DRAFT_SCENE:
    case SAVE_DRAFT_SIGNPOST:
      return {
        ...state,
        status: writingDeskStates.SAVING
      }
    case LOAD_DRAFTS_FAILED:
    case LOAD_DRAFT_FAILED:
    case SAVE_DRAFT_FAILED:
      return {
        ...state,
        status: writingDeskStates.READY
      }
    case START_NEW_DRAFT:
      const nextState = {...state}
      delete nextState.activeDraft
      return nextState
    default:
      return state
  }
}