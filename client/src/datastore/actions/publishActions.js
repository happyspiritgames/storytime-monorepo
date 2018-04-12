import * as publishApi from '../../apis/publishApi'
import * as editionActions from './editionActions'

export const CREATE_EDITION = 'CREATE_EDITION'
export const createEdition = () => ({
  type: CREATE_EDITION
})

export const CREATED_EDITION = 'CREATED_EDITION'
export const createdEdition = (edition) => ({
  type: CREATED_EDITION,
  payload: {
    edition
  }
})

export const CREATE_EDITION_FAILED = 'CREATE_EDITION_FAILED'
export const createEditionFailed = (error) => ({
  type: CREATE_EDITION_FAILED,
  payload: {
    error
  },
  error: true
})

export const createNewEdition = (storyId) => {
  // TODO implement custom handler for case where publishing already started
  return (dispatch) => {
    dispatch(createEdition())
    publishApi.createEdition(
      storyId,
      edition => dispatch(createdEdition(edition)),
      error => dispatch(createEditionFailed(error))
    )
  }
}

export const getEditions = (storyId) => {
  return (dispatch) => {
    dispatch(editionActions.fetchEditions())
    publishApi.getEditions(
      storyId,
      editions => dispatch(editionActions.fetchedEditions(editions)),
      error => dispatch(editionActions.fetchEditionsFailed(error))
    )
  }
}

export const getEdition = (storyId, editionKey) => {
  return (dispatch) => {
    dispatch(editionActions.fetchEdition())
    publishApi.getEdition(
      storyId, editionKey,
      editions => dispatch(editionActions.fetchedEdition(editions)),
      error => dispatch(editionActions.fetchEditionFailed(error))
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
