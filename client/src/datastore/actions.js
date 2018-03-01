export const FETCH_CATALOG = 'FETCH_CATALOG'
export const fetchCatalog = () => ({
  type: FETCH_CATALOG,
})

export const LOAD_CATALOG = 'LOAD_CATALOG'
export const loadCatalog = (summaries) => ({
  type: LOAD_CATALOG,
  payload: {
    summaries
  }
})

export const stageCatalog = () => {
  return (dispatch) => {
    dispatch(fetchCatalog())
    return fetch('/api/stories')
      .then(
        res => res.json(),
        error => console.error('Could not fetch catalog', error)
      )
      .then(summaries => dispatch(loadCatalog(summaries)))
  }
}

export const FETCH_SUMMARY = 'FETCH_SUMMARY'
export const fetchSummary = (storyId) => ({
  type: FETCH_SUMMARY,
  payload: {
    storyId
  }
})

export const LOAD_SUMMARY = 'LOAD_SUMMARY'
export const loadSummary = (summary) => ({
  type: LOAD_SUMMARY,
  payload: {
    summary
  }
})

// TODO handle failures gracefully -- show and clear message on UI
export const FETCH_FAILED = 'FETCH_FAILED'
export const fetchFailed = (error) => ({
  type: FETCH_FAILED,
  payload: error,
  error: true
})

const findCachedSummary = (state, storyId) => {
  if (!state.summaries) {
    return
  }
  return state.summaries[storyId]
}

export const stageSummary = storyId => {
  return (dispatch, getState) => {
    const cachedSummary = findCachedSummary(getState(), storyId)
    if (cachedSummary) {
      console.log('found summary in cache')
      dispatch(loadSummary(cachedSummary))
    } else {
      dispatch(fetchSummary(storyId))
      return fetch(`/api/stories/${storyId}`)
        .then(
          res => res.json(),
          error => console.error('Something bad happened', error)
        )
        .then(summary => dispatch(loadSummary(summary)))
    }
  }
}

export const FETCH_SCENE = 'FETCH_SCENE'
export const fetchScene = (sceneId) => ({
  type: FETCH_SCENE,
  payload: {
    sceneId
  }
})

export const LOAD_SCENE = 'LOAD_SCENE'
export const loadScene = (scene) => ({
  type: LOAD_SCENE,
  payload: {
    scene
  }
})

const findCachedScene = (state, sceneId) => {
  if (!(state.reader && state.reader.scenes)) {
    return
  }
  return state.reader.scenes[sceneId]
}

export const stageScene = (storyId, sceneId) => {
  return (dispatch, getState) => {
    const cachedScene = findCachedScene(getState(), sceneId)
    if (cachedScene) {
      console.log('Found scene in cache')
      return Promise.resolve()
    } else {
      dispatch(fetchScene(sceneId))
      return fetch(`/api/stories/${storyId}/scenes/${sceneId}`)
        .then(
          res => res.json(),
          error => console.error('Something bad happened', error)
        )
        .then(scene => dispatch(loadScene(scene)))
    }
  }
}

export const BEGIN_STORY = 'BEGIN_STORY'
export const beginStory = () => ({
  type: BEGIN_STORY
})

export const replay = () => {
  return (dispatch) => {
    dispatch(beginStory())
  }
}

export const play = (storyId) => {
  return (dispatch, getState) => {
    const { reader, summaries } = getState()

    // story already loaded -- just start at beginning
    if (reader && reader.summary && reader.summary.storyId === storyId) {
      replay()
      return
    }

    if (summaries && summaries[storyId]) {
      dispatch(loadSummary)
    }

    dispatch(stageSummary(storyId))
    .then(() => {
      const { storyId, firstSceneId } = getState().reader.summary
      dispatch(stageScene(storyId, firstSceneId))
      .then(() => {
        dispatch(beginStory())
      })
    })
  }
}

export const VISIT_SCENE = 'VISIT_SCENE'
export const visitScene = (sceneId) => ({
  type: VISIT_SCENE,
  payload: {
    sceneId
  }
})

export const goToScene = (sceneId) => {
  return (dispatch, getState) => {
    const { storyId } = getState().reader.summary
    if (!storyId) {
      console.error('Story summary is not loaded')
      return
    }
    dispatch(stageScene(storyId, sceneId))
    .then(() => {
      dispatch(visitScene(sceneId))
    })
  }
}

// TODO to support bookmarks, create method goToBookmark that takes storyId and sceneId
// would work like begin but go to given scene instead of first scene
