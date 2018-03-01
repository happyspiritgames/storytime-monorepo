import * as storyActions from './storyActions'
import * as uiActions from './uiActions'

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

const findCachedScene = (state, storyId, sceneId) => {
  if (!(state.stories && state.stories[storyId])) {
    return
  }
  return state.stories[storyId].scenes[sceneId]
}

export const stageScene = (storyId, sceneId) => {
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
      dispatch(loadSummary())
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

// TODO to support bookmarks, create method goToBookmark that takes storyId and sceneId
// would work like begin but go to given scene instead of first scene
