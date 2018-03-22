import { LOADED_DRAFTS, SAVED_DRAFT } from '../actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADED_DRAFTS:
      let drafts = {}
      action.payload.drafts.forEach(draft => {
        drafts[draft.storyId] = draft
      })
      return drafts
    case SAVED_DRAFT:
      if (state[action.payload.nextDraft.storyId]) {
        return state
      }
      return {
        ...state,
        [action.payload.nextDraft.storyId]: action.payload.nextDraft
      }
    default:
      return state
  }
}