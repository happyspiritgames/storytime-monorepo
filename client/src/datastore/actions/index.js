// story actions

export const FETCH_CATALOG = 'FETCH_CATALOG'
export const fetchCatalog = () => ({
  type: FETCH_CATALOG,
})

export const FETCHED_CATALOG = 'FETCHED_CATALOG'
export const fetchedCatalog = (summaries) => ({
  type: FETCHED_CATALOG,
  payload: {
    summaries
  }
})

export const FETCH_CATALOG_FAILED = 'FETCH_CATALOG_FAILED'
export const fetchCatalogFailed = (error) => ({
  type: FETCH_CATALOG_FAILED,
  payload: error,
  error: true
})

export const FETCH_SUMMARY = 'FETCH_SUMMARY'
export const fetchSummary = (storyId) => ({
  type: FETCH_SUMMARY,
  payload: {
    storyId
  }
})

export const FETCHED_SUMMARY = 'FETCHED_SUMMARY'
export const fetchedSummary = (summary) => ({
  type: FETCHED_SUMMARY,
  payload: {
    summary
  }
})

export const FETCH_SUMMARY_FAILED = 'FETCH_SUMMARY_FAILED'
export const fetchSummaryFailed = (error, storyId) => ({
  type: FETCH_SUMMARY_FAILED,
  payload: error,
  error: true,
  meta: {
    storyId
  }
})

export const FETCH_SCENE = 'FETCH_SCENE'
export const fetchScene = (storyId, sceneId) => ({
  type: FETCH_SCENE,
  payload: {
    storyId,
    sceneId
  }
})

export const FETCHED_SCENE = 'FETCHED_SCENE'
export const fetchedScene = (storyId, scene) => ({
  type: FETCHED_SCENE,
  payload: {
    storyId,
    scene
  }
})

export const FETCH_SCENE_FAILED = 'FETCH_SCENE_FAILED'
export const fetchSceneFailed = (error, storyId, sceneId) => ({
  type: FETCH_SCENE_FAILED,
  payload: error,
  error: true,
  meta: {
    storyId,
    sceneId
  }
})


// UI actions

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


// composite actions

export const refreshCatalog = () => {
  return (dispatch) => {
    dispatch(libraryFetching())
    dispatch(fetchCatalog())
    return fetch('/api/stories')
      .then(
        res => res.json(),
        error => {
          dispatch(fetchCatalogFailed(
            new Error('Could not fetch catalog'))
          )
          dispatch(libraryReady())
        }
      )
      .then(summaries => {
        dispatch(fetchedCatalog(summaries))
        dispatch(libraryReady())
      })
  }
}

export const retrieveSummary = (storyId, next) => {
  return (dispatch) => {
    dispatch(fetchSummary(storyId))
    return fetch(`/api/stories/${storyId}`)
      .then(
        res => res.json(),
        error => dispatch(
          fetchSummaryFailed(
            new Error(`Could not fetch summary for story with ID ${storyId}`),
            storyId)
        )
      )
      .then(summary => {
        dispatch(fetchedSummary(summary))
        if (next) {
          next()
        }
      })
  }
}

export const retrieveScene = (storyId, sceneId, next) => {
  return (dispatch, getState) => {
    dispatch(fetchScene(storyId, sceneId))
    return fetch(`/api/stories/${storyId}/scenes/${sceneId}`)
      .then(
        res => res.json(),
        error => dispatch(
          fetchSceneFailed(
            new Error(`Could not fetch scene with ID ${sceneId} for story ${storyId}`),
            storyId, sceneId)
        )
      )
      .then(scene => {
        dispatch(fetchedScene(storyId, scene))
        if (next) {
          next()
        }
      })
  }
}

export const replay = () => {
  return (dispatch) => {
    dispatch(beginStory())
  }
}

export const play = (storyId) => {
  return (dispatch, getState) => {
    const { stories } = getState()

    // story not cached
    if (!stories[storyId]) {
      console.log('story not in cache', storyId)
      dispatch(retrieveSummary(storyId))
        .then(() => {
          const sceneId = getState().stories[storyId].summary.firstSceneId
          dispatch(beginStory(storyId, sceneId))
          dispatch(
            retrieveScene(storyId, sceneId, () => {
              dispatch(readerReady())
            })
          )
        }
      )
      return
    }

    // story cached but not scene
    const { firstSceneId } = stories[storyId].summary
    if (!stories[storyId].scenes || !stories[storyId].scenes[firstSceneId]) {
      console.log('scene not in cache', storyId, firstSceneId)
      dispatch(retrieveScene(storyId, firstSceneId))
      //     .then(dispatch(beginStory()))
      // )
      return
    }

    // story and first scene cached
    console.log('story and scene in cache', storyId, firstSceneId)
    dispatch(beginStory(storyId, firstSceneId))
  }
}

export const goToScene = (sceneId) => {
  return (dispatch, getState) => {
    const { storyId } = getState().reader
    if (!storyId) {
      console.error('Unknown story ID')
      return
    }

    // scene cached
    if (getState().stories[storyId].scenes[sceneId]) {
      dispatch(visitScene(sceneId))
      return
    }

    // scene not cached
    dispatch(fetchScene(storyId, sceneId))
    .then(dispatch(visitScene(sceneId)))
  }
}

// TODO to support bookmarks, create method goToBookmark that takes storyId and sceneId
// would work like begin but go to given scene instead of first scene
