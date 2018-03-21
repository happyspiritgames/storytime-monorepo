import {
  LOGGED_IN,
  LOGIN_FAILED,
  LOGOUT,
  FETCHED_PROFILE,
  UPDATED_PROFILE,
  FETCHED_ROLES,
  FETCH_ROLES_FAILED
} from '../actions'

export const initialState = {
  profile: {},
  roles: [],
  userLoggedOut: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      const { idToken, accessToken } = action.payload
      return {
        ...state,
        idToken,
        accessToken,
        userLoggedOut: false
      }
    case LOGIN_FAILED:
    case LOGOUT:
      let nextState = {
        ...state,
        userLoggedOut: true
      }
      delete nextState.idToken
      delete nextState.accessToken
      return nextState
    case FETCHED_PROFILE:
    case UPDATED_PROFILE:
      return {
        ...state,
        profile: action.payload.profile
      }
    case FETCHED_ROLES:
      const guardAgainstEmptyArray = action.payload.roles ? action.payload.roles : ['noRoles']
      return {
        ...state,
        roles: guardAgainstEmptyArray,
      }
    case FETCH_ROLES_FAILED:
      return {
        ...state,
        roles: ['noRoles-fetchFailed']
      }
    default:
      return state
  }
}