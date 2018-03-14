import { SAVED_DRAFT, LOADED_DRAFT } from '../actions'
import scenes from './scenes'

export const initialState = {
  summary: {},
  scenes: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVED_DRAFT:
      return {
        ...state,
        summary: action.payload.nextDraft
      }
    case LOADED_DRAFT:
      return {
        summary: action.payload.draft.summary,
        scenes: scenes(state.scenes, action)
      }
    default:
      return state
  }
}