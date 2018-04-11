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
      edition => dispatch(fetchedEditionScene(edition)),
      error => dispatch(fetchEditionSceneFailed(error))
    )
  }
}


/*
export const replay = () => {
  return (dispatch) => {
    dispatch(beginStory())
  }
}

export const play = (storyId) => {
  return (dispatch, getState) => {
    dispatch(readerNotReady())

    const { stories } = getState()
    // story not cached
    if (!stories[storyId]) {
      dispatch(retrieveSummary(storyId))
        .then(() => {
          const sceneId = getState().stories[storyId].summary.firstSceneId
          dispatch(retrieveScene(storyId, sceneId, () => {
              dispatch(beginStory(storyId, sceneId))
              dispatch(readerReady())
            })
          )
        })
      return
    }

    // story cached, scene not cached
    const { firstSceneId } = stories[storyId].summary
    if (!stories[storyId].scenes || !stories[storyId].scenes[firstSceneId]) {
      console.log('play ==> scene not in state', storyId, firstSceneId)
      dispatch(readerFetching())
      dispatch(retrieveScene(storyId, firstSceneId, () => {
        dispatch(beginStory(storyId, firstSceneId))
        dispatch(readerReady())
      }))
      return
    }

    // story and scene cached
    console.log('play ==> found story and scene in state', storyId, firstSceneId)
    dispatch(beginStory(storyId, firstSceneId))
    dispatch(readerReady())
  }
}

export const goToScene = (sceneId) => {
  return (dispatch, getState) => {
    const { stories } = getState()
    const { storyId } = getState().reader
    if (!storyId) {
      console.error('Unknown story ID')
      return
    }

    // scene not cached
    if (!stories[storyId].scenes || !stories[storyId].scenes[sceneId]) {
      console.log('goToScene ==> scene not in state', storyId, sceneId)
      dispatch(readerFetching())
      dispatch(retrieveScene(storyId, sceneId, () => {
        dispatch(visitScene(sceneId))
        dispatch(readerReady())
      }))
      return
    }

    // scene cached
    console.log('goToScene ==> found scene in state', storyId, sceneId)
    dispatch(visitScene(sceneId))
  }
}

*/