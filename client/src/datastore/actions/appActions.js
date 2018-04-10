export const LIBRARY_FETCHING = 'LIBRARY_FETCHING'
export const libraryFetching = () => ({
  type: LIBRARY_FETCHING
})

export const LIBRARY_READY = 'LIBRARY_READY'
export const libraryReady = () => ({
  type: LIBRARY_READY
})

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
export const beginStory = (storyId, sceneId) => ({
  type: BEGIN_STORY,
  payload: {
    storyId,
    sceneId
  }
})

export const VISIT_SCENE = 'VISIT_SCENE'
export const visitScene = (sceneId) => ({
  type: VISIT_SCENE,
  payload: {
    sceneId
  }
})
