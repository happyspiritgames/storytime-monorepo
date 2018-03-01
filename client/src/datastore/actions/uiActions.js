export const LIBRARY_FETCHING = 'LIBRARY_FETCHING'
export const libraryFetching = (storyId) => ({
  type: LIBRARY_FETCHING,
  payload: {
    storyId
  }
})

export const LIBRARY_READY = 'LIBRARY_READY'
export const libraryReady = (storyId) => ({
  type: LIBRARY_READY,
  payload: {
    storyId
  }
})

export const READER_FETCHING = 'READER_FETCHING'
export const readerFetching = (storyId) => ({
  type: READER_FETCHING,
  payload: {
    storyId
  }
})

export const READER_READY = 'READER_READY'
export const readerReady = (storyId) => ({
  type: READER_FETCHING,
  payload: {
    storyId
  }
})

export const BEGIN_STORY = 'BEGIN_STORY'
export const beginStory = () => ({
  type: BEGIN_STORY
})

export const VISIT_SCENE = 'VISIT_SCENE'
export const visitScene = (sceneId) => ({
  type: VISIT_SCENE,
  payload: {
    sceneId
  }
})

export const retrieveSummary = storyId => {
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

const findCachedScene = (state, storyId, sceneId) => {
  if (!(state.stories && state.stories[storyId])) {
    return
  }
  return state.stories[storyId].scenes[sceneId]
}

export const retrieveScene = (storyId, sceneId) => {
  return (dispatch, getState) => {
    const cachedScene = findCachedScene(getState(), storyId, sceneId)
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

export const replay = () => {
  return (dispatch) => {
    dispatch(play())
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
      dispatch(fetchedSummary())
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
