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
        storyId: action.payload.storyId,
        sceneId: action.payload.sceneId,
        history: [action.payload.sceneId]
      }

    case actions.VISIT_SCENE:
      const sceneToVisit = action.payload.sceneId
      if (!sceneToVisit) {
        return state
      }
      return {
        ...state,
        sceneId: action.payload.sceneId,
        history: [...state.history, action.payload.sceneId]
      }

    default:
      return state
  }
}
