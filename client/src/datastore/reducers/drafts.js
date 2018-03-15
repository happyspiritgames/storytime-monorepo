import { LOADED_DRAFTS } from '../actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADED_DRAFTS:
      let drafts = {}
      action.payload.drafts.forEach(draft => {
        drafts[draft.storyId] = draft
      })
      return drafts
    default:
      return state
  }
}