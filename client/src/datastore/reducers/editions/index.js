import { FETCHED_EDITIONS, FETCHED_EDITION, FETCHED_EDITION_SCENE, FETCH_EDITIONS, SAVED_EDITION } from '../../actions'
import editionReducer from './edition'

export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EDITIONS:
      return initialState
    case FETCHED_EDITIONS:
      const nextEditions = {}
      action.payload.editions.forEach(edition => {
        nextEditions[edition.editionKey] = edition
      })
      return {
        ...state,
        ...nextEditions
      }
    case FETCHED_EDITION:
      const { edition } = action.payload
      return {
        ...state,
        [edition.editionKey]: edition
      }
    case SAVED_EDITION:
      const updatedEdition = action.payload.edition
      const out = {
        ...state,
        [updatedEdition.editionKey]: editionReducer(state[updatedEdition.editionKey], updatedEdition)
      }
      console.log('returning', out)
      return out
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