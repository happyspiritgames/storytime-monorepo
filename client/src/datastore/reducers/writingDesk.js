import { FETCH_DRAFTS, FETCHED_DRAFTS, FETCH_DRAFTS_FAILED } from '../actions'

export const writingDeskStates = {
  READY: 'READY',
  FETCHING: 'FETCHING'
}

export const initialState = {
  status: writingDeskStates.READY,
  draftProjects: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRAFTS:
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
    case FETCH_DRAFTS_FAILED:
      return {
        ...state,
        status: writingDeskStates.READY
      }
    default:
      return state
  }
}