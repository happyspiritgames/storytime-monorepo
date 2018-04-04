import { FETCHED_CODES } from '../actions'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_CODES:
      return {
        [action.payload.type]: action.payload.codes
      }
    default:
      return state
  }
}