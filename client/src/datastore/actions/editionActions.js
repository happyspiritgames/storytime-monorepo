import * as storyApi from '../../apis/storyTimeApi'
// edition actions

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

export const loadCatalog = () => {
  return (dispatch) => {
    dispatch(fetchEditions())
    storyApi.getPublishedEditions(
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

export const loadEdition = (editionKey) => {
  return (dispatch) => {
    dispatch(fetchEdition())
    storyApi.getEdition(editionKey,
      edition => dispatch(fetchedEdition(edition)),
      error => dispatch(fetchEditionFailed(error))
    )
  }
}

export const FETCH_EDITION_SCENE = 'FETCH_EDITION_SCENE'
export const fetchEditionScene = () => ({
  type: FETCH_EDITION_SCENE
})

export const FETCHED_EDITION_SCENE = 'FETCHED_EDITION_SCENE'
export const fetchedEditionScene = (editionKey, scene) => ({
  type: FETCHED_EDITION_SCENE,
  payload: {
    editionKey,
    scene
  }
})

export const FETCH_EDITION_SCENE_FAILED = 'FETCH_EDITION_SCENE_FAILED'
export const fetchEditionSceneFailed = (error) => ({
  type: FETCH_EDITION_SCENE_FAILED,
  payload: {
    error
  },
  error: true
})

export const loadEditionScene = (editionKey, sceneId) => {
  return (dispatch) => {
    dispatch(fetchEditionScene())
    storyApi.getEditionScene(editionKey, sceneId,
      scene => dispatch(fetchedEditionScene(editionKey, scene)),
      error => dispatch(fetchEditionSceneFailed(error))
    )
  }
}
