import { EDIT_PROFILE, STOP_EDIT_PROFILE, UPDATED_PROFILE, FETCHED_ROLES } from '../actions'

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
    case FETCHED_ROLES:
      let roleFlags = {}
      action.payload.roles.forEach((role) => {
        const roleKey = `is${role.charAt(0).toUpperCase() + role.slice(1)}`
        return roleFlags[roleKey] = true
      })
      return {
        ...state,
        ...roleFlags
      }
    default:
      return state
  }
}