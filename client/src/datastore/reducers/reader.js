import * as actions from '../actions'

export const readerStates = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
  FETCHING: 'FETCHING',
  HAS_ERRORS: 'HAS_ERRORS'
}

const dataShape = {
  status: readerStates.READY,
  summary: {},
  scenes: {
    '37': {},
    '42': {},
    '99': {}
  },
  currentSceneId: '42',
  storyToFetch: 'abc',
  sceneToFetch: '99',
  history: ['37', '42']
}

export const initialState = {
  status: readerStates.NOT_READY,
  summary: {},
  scenes: {},
  history: []
}

const isReady = (state) => {
  return state.summary && state.currentScene && state.scenes[state.currentScene]
}

export default (state = initialState, action) => {
  let status = readerStates.NOT_READY
  switch (action.type) {
    case actions.FETCH_SUMMARY:
      return {
        ...state,
        status: readerStates.FETCHING,
        storyToFetch: action.payload.storyId
      }

    case actions.LOAD_SUMMARY:
      // TODO handle error condition
      if (!action.payload.summary) {
        console.error('Did not find summary to load')
        return state
      }
      // play nicely with outstanding calls to fetch scenes
      status = (state.sceneToFetch) ? readerStates.FETCHING : readerStates.NOT_READY;
      return {
        ...state,
        summary: action.payload.summary,
        status,
        storyToFetch: undefined
      }

    case actions.FETCH_SCENE:
      return {
        ...state,
        status: readerStates.FETCHING,
        sceneToFetch: action.payload.sceneId
      }

    // TODO someday implement PREFETCH_SCENES -- for background loading

    case actions.LOAD_SCENE:
      // TODO handle error condition
      if (!action.payload.scene) {
        console.error('Did not find scene to load')
        return state
      } else if (!action.payload.scene.sceneId) {
        console.error('The scene must have an ID to store in client state.')
        return state
      }
      const newScenes = {
        ...state.scenes,
        [action.payload.scene.sceneId]: action.payload.scene
      }
      status = (state.storyToFetch) ? readerStates.FETCHING : readerStates.NOT_READY;
      return {
        ...state,
        scenes: newScenes,
        status
      }

      case actions.BEGIN_STORY:
      // must have summary and first scene loaded
      if (!(state.summary && state.scenes[state.summary.firstSceneId])) {
        return state
      }
      return {
        ...state,
        currentScene: state.summary.firstSceneId,
        status: readerStates.READY
      }

    case actions.VISIT_SCENE:
      if (!action.payload.sceneId) {
        console.error('Did not find next scene ID')
        return state
      }
      // TODO handle scene not in store
      return {
        ...state,
        currentScene: action.payload.sceneId
      }

    default:
      return state
  }
}
