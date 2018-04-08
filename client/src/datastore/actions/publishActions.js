import * as publishApi from '../../apis/publishApi'

export const START_TO_PUBLISH = 'START_TO_PUBLISH'
export const startToPublish = () => ({
  type: START_TO_PUBLISH
})

export const STARTED_TO_PUBLISH = 'STARTED_TO_PUBLISH'
export const startedToPublish = (edition) => ({
  type: STARTED_TO_PUBLISH,
  payload: {
    edition
  }
})

export const START_TO_PUBLISH_FAILED = 'START_TO_PUBLISH_FAILED'
export const startToPublishFailed = (error) => ({
  type: START_TO_PUBLISH_FAILED,
  payload: {
    error
  },
  error: true
})

export const createEdition = (storyId) => {
  // TODO implement custom handler for case where publishing already started
  return (dispatch) => {
    dispatch(startToPublish())
    publishApi.createEdition(
      storyId,
      edition => dispatch(startedToPublish(edition)),
      error => dispatch(startToPublishFailed(error))
    )
  }
}

export const FETCH_EDITIONS = 'FETCH_EDITIONS'
export const fetchEditions = () => ({
  type: FETCH_EDITIONS
})

export const FETCHED_EDITIONS = 'FETCHED_EDITIONS'
export const fetchedEditions = (editions) => ({
  type: FETCHED_EDITIONS,
  payload: {
    editions
  }
})

export const FETCH_EDITIONS_FAILED = 'FETCH_EDITIONS_FAILED'
export const fetchEditionsFailed = (error) => ({
  type: FETCH_EDITIONS_FAILED,
  payload: {
    error
  },
  error: true
})

export const getEditions = (storyId) => {
  return (dispatch) => {
    dispatch(fetchEditions())
    publishApi.getEditions(
      storyId,
      editions => dispatch(fetchedEditions(editions)),
      error => dispatch(fetchEditionsFailed(error))
    )
  }
}

export const FETCH_EDITION = 'FETCH_EDITION'
export const fetchEdition = () => ({
  type: FETCH_EDITION
})

export const FETCHED_EDITION = 'FETCHED_EDITION'
export const fetchedEdition = (edition) => ({
  type: FETCHED_EDITION,
  payload: {
    edition
  }
})

export const FETCH_EDITION_FAILED = 'FETCH_EDITION_FAILED'
export const fetchEditionFailed = (error) => ({
  type: FETCH_EDITION_FAILED,
  payload: {
    error
  },
  error: true
})

export const getEdition = (storyId, editionKey) => {
  return (dispatch) => {
    dispatch(fetchEdition())
    publishApi.getEdition(
      storyId, editionKey,
      editions => dispatch(fetchedEdition(editions)),
      error => dispatch(fetchEditionFailed(error))
    )
  }
}

export const SAVE_EDITION = 'SAVE_EDITION'
export const saveEdition = () => ({
  type: SAVE_EDITION
})

export const SAVED_EDITION = 'SAVED_EDITION'
export const savedEdition = (edition) => ({
  type: SAVED_EDITION,
  payload: {
    edition
  }
})

export const SAVE_EDITION_FAILED = 'SAVE_EDITION_FAILED'
export const saveEditionFailed = (error) => ({
  type: SAVE_EDITION_FAILED,
  payload: {
    error
  },
  error: true
})

export const updateEdition = (storyId, editionKey, editionUpdate) => {
  console.log('publishActions.saveEdition', storyId, editionKey, editionUpdate)
  return (dispatch) => {
    dispatch(saveEdition())
    publishApi.updateEdition(
      storyId, editionKey, editionUpdate,
      edition => dispatch(savedEdition(edition)),
      error => dispatch(saveEditionFailed(error))
    )
  }
}

export const PUBLISH = 'PUBLISH'
export const sendPublish = () => ({
  type: PUBLISH
})

export const PUBLISHED = 'PUBLISHED'
export const published = (edition) => ({
  type: PUBLISHED,
  payload: {
    edition
  }
})

export const PUBLISH_FAILED = 'PUBLISH_FAILED'
export const sendPublishFailed = (error) => ({
  type: PUBLISH_FAILED,
  payload: {
    error
  },
  error: true
})

export const publish = (storyId, editionKey) => {
  return (dispatch) => {
    dispatch(sendPublish())
    publishApi.publish(
      storyId, editionKey,
      edition => dispatch(published(edition)),
      error => dispatch(sendPublishFailed(error))
    )
  }
}
