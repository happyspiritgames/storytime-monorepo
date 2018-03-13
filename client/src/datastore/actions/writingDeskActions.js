import * as authorApi from '../../apis/authorApi'

export const FETCH_DRAFTS = 'FETCH_DRAFTS'
export const fetchDrafts = () => ({
  type: FETCH_DRAFTS
})

export const FETCHED_DRAFTS = 'FETCHED_DRAFTS'
export const fetchedDrafts = (draftSummaries) => ({
  type: FETCHED_DRAFTS,
  payload: {
    drafts: draftSummaries
  }
})

export const FETCH_DRAFTS_FAILED = 'FETCH_DRAFTS_FAILED'
export const fetchDraftsFailed = (error) => ({
  type: FETCH_DRAFTS_FAILED,
  payload: {
    error
  },
  error: true
})

export const retrieveDraftProjects = () => {
  return (dispatch) => {
    dispatch(fetchDrafts())
    authorApi.getDraftStories(
      stories => dispatch(fetchedDrafts(stories)),
      error => dispatch(fetchDraftsFailed(error))
    )
  }
}
