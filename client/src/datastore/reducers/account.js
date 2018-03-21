import { EDIT_PROFILE, STOP_EDIT_PROFILE, UPDATED_PROFILE } from '../actions'

export const initialState = {
  editMode: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
        editMode: true
      }
    case STOP_EDIT_PROFILE:
      return {
        ...state,
        editMode: false
      }
    case UPDATED_PROFILE:
      return {
        ...state,
        editMode: false
      }
    default:
      return state
  }
}