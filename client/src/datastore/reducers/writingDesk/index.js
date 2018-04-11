import * as actions from '../../actions'
import activeDraftReducer from './activeDraft'

export const writingDeskStates = {
  READY: 'READY',
  LOADING: 'LOADING',
  SAVING: 'SAVING',
  PUBLISHING: 'PUBLISHING'
}

export const initialState = {
  status: writingDeskStates.READY,
  draftProjects: []
}

export default (state = initialState, action) => {
  let projectIds
  switch (action.type) {
    case actions.LOAD_DRAFTS:
    case actions.LOAD_DRAFT:
    case actions.LOAD_DRAFT_SCENE:
    case actions.LOAD_DRAFT_SIGNPOST:
    case actions.CREATE_EDITION:
    case actions.FETCH_EDITIONS:
    case actions.FETCH_EDITION:
      return {
        ...state,
        status: writingDeskStates.LOADING
      }
    case actions.PUBLISH:
      return {
        ...state,
        status: writingDeskStates.PUBLISHING
      }
    case actions.LOADED_DRAFTS:
      projectIds = action.payload.drafts.map(draft => draft.storyId)
      return {
        ...state,
        draftProjects: projectIds,
        status: writingDeskStates.READY
      }
    case actions.SAVED_DRAFT:
      projectIds = (state.draftProjects.includes(action.payload.nextDraft.storyId))
        ? state.draftProjects : [...state.draftProjects, action.payload.nextDraft.storyId]
      return {
        ...state,
        activeDraft: activeDraftReducer(state.activeDraft, action),
        draftProjects: projectIds,
        status: writingDeskStates.READY
      }
    case actions.LOADED_DRAFT:
    case actions.LOADED_DRAFT_SCENE:
    case actions.SAVED_DRAFT_SCENE:
    case actions.LOADED_DRAFT_SIGNPOST:
    case actions.SAVED_DRAFT_SIGNPOST:
      return {
        ...state,
        activeDraft: activeDraftReducer(state.activeDraft, action),
        status: writingDeskStates.READY
      }
    case actions.CREATED_EDITION:
    case actions.FETCHED_EDITION:
    case actions.SAVED_EDITION:
    case actions.PUBLISHED:
      return {
        ...state,
        activeEdition: action.payload.edition.editionKey,
        status: writingDeskStates.READY
      }
    case actions.SAVE_DRAFT:
    case actions.SAVE_DRAFT_SCENE:
    case actions.SAVE_DRAFT_SIGNPOST:
    case actions.SAVE_EDITION:
      return {
        ...state,
        status: writingDeskStates.SAVING
      }
    case actions.LOAD_DRAFTS_FAILED:
    case actions.LOAD_DRAFT_FAILED:
    case actions.SAVE_DRAFT_FAILED:
    case actions.SAVE_DRAFT_SCENE_FAILED:
    case actions.LOAD_DRAFT_SCENE_FAILED:
    case actions.LOAD_DRAFT_SIGNPOST_FAILED:
    case actions.SAVE_DRAFT_SIGNPOST_FAILED:
    case actions.CREATE_EDITION_FAILED:
    case actions.FETCHED_EDITIONS:
    case actions.FETCH_EDITIONS_FAILED:
    case actions.FETCH_EDITION_FAILED:
    case actions.SAVE_EDITION_FAILED:
    case actions.PUBLISH_FAILED:
      return {
        ...state,
        status: writingDeskStates.READY
      }
    case actions.START_NEW_DRAFT:
      const nextState = {...state}
      delete nextState.activeDraft
      return nextState
    default:
      return state
  }
}