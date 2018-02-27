import * as actions from '../actions'
import {
  READY,
  FETCHING,
  FAILED_TO_FETCH
} from '../components/reader/status'

const dataShape = {
  status: READY,
  summary: {},
  scenes: {
    '37': {},
    '42': {},
    '99': {}
  },
  currentScene: '42',
  history: ['37', '42']
}

const initialState = {
  summary: {},
  scenes: {},
  history: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_SUMMARY:
      return {
        ...state,
        status: FETCHING,
        storyToFetch: action.payload.storyId
      }

    case actions.LOAD_SUMMARY:
      if (!action.payload.summary) {
        console.error('Did not find summary to load')
        return state
      }
      // play nicely with outstanding calls to fetch scenes
      const status = (state.scenesToFetch === undefined) ? READY : FETCHING;
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
        status: FETCHING,
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
        staus: READY
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
