import {
  FETCH_DRAFTS,
  FETCHED_DRAFTS,
  FETCH_DRAFTS_FAILED,
  LOAD_DRAFT,
  LOADED_DRAFT,
  LOAD_DRAFT_FAILED,
  SAVE_DRAFT,
  SAVED_DRAFT,
  SAVE_DRAFT_FAILED
} from '../actions'
import activeDraft from './activeDraft'

export const writingDeskStates = {
  READY: 'READY',
  FETCHING: 'FETCHING',
  SAVING: 'SAVING'
}

export const initialState = {
  status: writingDeskStates.READY,
  draftProjects: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRAFTS:
    case LOAD_DRAFT:
      return {
        ...state,
        status: writingDeskStates.FETCHING
      }
    case FETCHED_DRAFTS:
      const projectIds = action.payload.drafts.map(draft => draft.storyId)
      return {
        ...state,
        draftProjects: projectIds,
        status: writingDeskStates.READY
      }
    case LOADED_DRAFT:
      return {
        ...state,
        activeDraft: activeDraft(state.activeDraft, action),
        status: writingDeskStates.READY
      }
    case SAVE_DRAFT:
      return {
        ...state,
        status: writingDeskStates.SAVING
      }
    case SAVED_DRAFT:
      return {
        ...state,
        activeDraft: activeDraft(state.activeDraft, action),
        status: writingDeskStates.READY
      }
    case LOAD_DRAFT_FAILED:
    case FETCH_DRAFTS_FAILED:
    case SAVE_DRAFT_FAILED:
      return {
        ...state,
        status: writingDeskStates.READY
      }
    default:
      return state
  }
}