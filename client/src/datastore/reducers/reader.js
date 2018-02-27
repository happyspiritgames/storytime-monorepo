import * as actions from '../actions'

export const readerStatus = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
  FETCHING: 'FETCHING',
  HAS_ERRORS: 'HAS_ERRORS'
}

const dataShape = {
  status: readerStatus.READY,
  summary: {},
  scenes: {
    '37': {},
    '42': {},
    '99': {}
  },
  currentScene: '42',
  history: ['37', '42']
}

export const initialState = {
  status: readerStatus.NOT_READY,
  summary: {},
  scenes: {},
  history: []
}

const isReady = (state) => {
  return state.summary && state.currentScene && state.scenes[state.currentScene]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_SUMMARY:
      return {
        ...state,
        status: readerStatus.FETCHING,
        storyToFetch: action.payload.storyId
      }

    case actions.LOAD_SUMMARY:
      if (!action.payload.summary) {
        console.error('Did not find summary to load')
        return state
      }
      // play nicely with outstanding calls to fetch scenes
      const status = (state.scenesToFetch === undefined)
        ? readerStatus.READY : readerStatus.FETCHING;
      return {
        ...state,
        summary: action.payload.summary,
        status,
        storyToFetch: undefined
      }

    case actions.FETCH_SCENE:
      const sceneId = action.payload.sceneId
      const scenesToFetch = (state.scenesToFetch)
        ? [ ...state.scenesToFetch, sceneId ]
        : [ sceneId ]
      return {
        ...state,
        status: readerStatus.FETCHING,
        scenesToFetch
      }

    case actions.LOAD_SCENE:
      if (!action.scene) {
        console.error('Did not find scene to load')
        return state
      } else if (!action.payload.scene.sceneId) {
        console.error('The scene must have an ID to store in client state.')
        return state
      }
      const nextScenes = Object.assign({}, state.scenes, { [action.payload.scene.sceneId]: action.payload.scene })
      return {
        ...state,
        scenes: nextScenes,
        staus: readerStatus.READY
      }

    case actions.VISIT_SCENE:
      if (!action.payload.sceneId) {
        console.error('Did not find next scene ID')
        return state
      }
      return {
        ...state,
        currentScene: action.payload.sceneId
      }

    default:
      return state
  }
}
