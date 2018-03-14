import { SAVED_DRAFT } from '../actions'

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
    default:
      return state
  }
}