import * as publishApi from '../../apis/publishApi'

export const START_TO_PUBLISH = 'START_TO_PUBLISH'
export const startToPublish = () => ({
  type: START_TO_PUBLISH
})

export const STARTED_TO_PUBLISH = 'STARTED_TO_PUBLISH'
export const startedToPublish = (proof) => ({
  type: STARTED_TO_PUBLISH,
  payload: {
    proof
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
      proof => dispatch(startedToPublish(proof)),
      error => dispatch(startToPublishFailed(error))
    )
  }
}

export const FETCH_EDITIONS = 'FETCH_EDITIONS'
export const fetchEditions = () => ({
  type: FETCH_EDITIONS
})

export const FETCHED_EDITIONS = 'FETCHED_EDITIONS'
export const fetchedEditions = (proofs) => ({
  type: FETCHED_EDITIONS,
  payload: {
    proofs
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
      proofs => dispatch(fetchedEditions(proofs)),
      error => dispatch(fetchEditionsFailed(error))
    )
  }
}

export const FETCH_EDITION = 'FETCH_EDITION'
export const fetchEdition = () => ({
  type: FETCH_EDITION
})

export const FETCHED_EDITION = 'FETCHED_EDITION'
export const fetchedEdition = (proof) => ({
  type: FETCHED_EDITION,
  payload: {
    proof
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
      proofs => dispatch(fetchedEdition(proofs)),
      error => dispatch(fetchEditionFailed(error))
    )
  }
}

export const SAVE_EDITION = 'SAVE_EDITION'
export const saveEdition = () => ({
  type: SAVE_EDITION
})

export const SAVED_EDITION = 'SAVED_EDITION'
export const savedEdition = (proof) => ({
  type: SAVED_EDITION,
  payload: {
    proof
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

export const updateEdition = (storyId, editionKey, proofUpdate) => {
  console.log('publishActions.saveEdition', storyId, editionKey, proofUpdate)
  return (dispatch) => {
    dispatch(saveEdition())
    publishApi.updateEdition(
      storyId, editionKey, proofUpdate,
      proof => dispatch(savedEdition(proof)),
      error => dispatch(saveEditionFailed(error))
    )
  }
}

export const PUBLISH = 'PUBLISH'
export const sendPublish = () => ({
  type: PUBLISH
})

export const PUBLISHED = 'PUBLISHED'
export const published = (proof) => ({
  type: PUBLISHED,
  payload: {
    proof
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
      proof => dispatch(published(proof)),
      error => dispatch(sendPublishFailed(error))
    )
  }
}
