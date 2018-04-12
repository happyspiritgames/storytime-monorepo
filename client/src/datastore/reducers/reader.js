import * as actions from '../actions'

export const readerStates = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
  FETCHING: 'FETCHING'
}

export const initialState = {
  status: readerStates.NOT_READY,
  history: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.READER_FETCHING:
      return {
        ...state,
        status: readerStates.FETCHING
      }

    case actions.READER_READY:
      return {
        ...state,
        status: readerStates.READY
      }

    case actions.READER_NOT_READY:
      return {
        ...state,
        status: readerStates.NOT_READY
      }

    case actions.BEGIN_STORY:
      return {
        ...state,
        activeEdition: action.payload.editionKey,
        activeScene: action.payload.sceneId
      }

    case actions.VISIT_SCENE:
      return {
        ...state,
        activeScene: action.payload.sceneId
      }

    default:
      return state
  }
}
