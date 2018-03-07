import { FETCHED_PROFILE, UPDATED_PROFILE } from '../actions'

export const initialState = {
  profile: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_PROFILE:
    case UPDATED_PROFILE:
      return {
        ...state,
        profile: action.payload.profile
      }
    default:
      return state
  }
}