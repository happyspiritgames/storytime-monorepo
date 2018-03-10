import { FETCHED_PROFILE, UPDATED_PROFILE, FETCHED_ROLES } from '../actions'

export const initialState = {
  profile: {},
  roles: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_PROFILE:
    case UPDATED_PROFILE:
      return {
        ...state,
        profile: action.payload.profile
      }
    case FETCHED_ROLES:
      return {
        ...state,
        roles: action.payload.roles
      }
    default:
      return state
  }
}