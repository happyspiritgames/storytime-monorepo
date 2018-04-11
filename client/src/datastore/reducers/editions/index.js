import { FETCHED_EDITIONS, FETCHED_EDITION, FETCHED_EDITION_SCENE } from '../../actions'
import editionReducer from './edition'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_EDITIONS:
      const flattened = {}
      action.payload.editions.forEach(edition => {
        flattened[edition.editionKey] = edition
      })
      return {
        ...state,
        ...flattened
      }
    case FETCHED_EDITION:
      const { edition } = action.payload
      return {
        ...state,
        [edition.editionKey]: edition
      }
    case FETCHED_EDITION_SCENE:
      const { editionKey } = action.payload
      return {
        ...state,
        [editionKey]: editionReducer(state[editionKey], action)
      }
    default:
      return state
  }
}