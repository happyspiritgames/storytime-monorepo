import * as editionActions from './editionActions'
import * as storyApi from '../../apis/storyTimeApi'

export const READER_FETCHING = 'READER_FETCHING'
export const readerFetching = () => ({
  type: READER_FETCHING
})

export const READER_READY = 'READER_READY'
export const readerReady = () => ({
  type: READER_READY
})

export const READER_NOT_READY = 'READER_NOT_READY'
export const readerNotReady = () => ({
  type: READER_NOT_READY
})

export const BEGIN_STORY = 'BEGIN_STORY'
export const beginStory = (editionKey, sceneId, startTime = Date.now()) => ({
  type: BEGIN_STORY,
  payload: {
    editionKey,
    sceneId,
    startTime: startTime
  }
})

export const VISIT_SCENE = 'VISIT_SCENE'
export const visitScene = (sceneId, timestamp = Date.now()) => ({
  type: VISIT_SCENE,
  payload: {
    sceneId,
    timestamp
  }
})

const startScene = (dispatch, editionKey, sceneId) => {
  dispatch(beginStory(editionKey, sceneId))
  dispatch(readerReady())
}

const loadSceneAndPlay = (dispatch, editionKey, sceneId) => {
  console.log('now fetch the first scene', editionKey, sceneId)
  dispatch(editionActions.fetchEditionScene())
  storyApi.getEditionScene(editionKey, sceneId,
    scene => {
      dispatch(editionActions.fetchedEditionScene(editionKey, scene))
      startScene(dispatch, editionKey, sceneId)
    },
    error => dispatch(editionActions.fetchEditionSceneFailed(error))
  )
}

export const playGame = (editionKey) => {
  return (dispatch, getState) => {
    dispatch(readerNotReady())

    const { editions } = getState()
    const edition = editions[editionKey]

    if (!edition) {
      // load edition and first scene. then start playing
      console.log('edition not loaded ==> fetching it', editionKey)
      dispatch(readerFetching())
      dispatch(editionActions.fetchEdition())
      storyApi.getEdition(editionKey,
        edition => {
          dispatch(editionActions.fetchedEdition(edition))
          const { firstSceneId } = edition.summary
          loadSceneAndPlay(dispatch, editionKey, firstSceneId)
        },
        error => dispatch(editionActions.fetchEditionFailed(error))
      )
      return
    }

    const { firstSceneId } = edition.summary
    const scene = (edition.scenes) ? edition.scenes[firstSceneId] : undefined

    if (!scene) {
      console.log('scene not loaded ==> fetching it', firstSceneId)
    }
  }
}
