import * as editionActions from './editionActions'

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
