import { FETCHED_EDITIONS, FETCHED_EDITION } from '../../actions'

export const initialState = {
  editions: [],
  byRating: {},
  byGenre: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_EDITIONS:
      return state
    case FETCHED_EDITION:
      return state
    default:
      return state
  }
}