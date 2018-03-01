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
  type: FETCH_SUMMARY_FAILED,
  payload: error,
  error: true,
  meta: {
    storyId,
    sceneId
  }
})

export const refreshCatalog = () => {
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
