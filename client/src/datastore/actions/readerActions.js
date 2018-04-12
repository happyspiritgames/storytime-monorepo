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

export const loadAndPlay = (editionKey) => {
  return (dispatch) => {
    dispatch(editionActions.fetchEdition())
    storyApi.getEdition(editionKey,
      edition => {
        dispatch(editionActions.fetchedEdition(edition))
        dispatch(editionActions.fetchEditionScene())
        storyApi.getEditionScene(editionKey, edition.summary.firstSceneId,
          scene => {
            dispatch(editionActions.fetchedEditionScene(editionKey, scene))
            dispatch(beginStory(editionKey, scene.sceneId))
          },
          error => dispatch(editionActions.fetchEditionSceneFailed(error))
        )
      },
      error => dispatch(editionActions.fetchEditionFailed(error))
    )
  }
}
