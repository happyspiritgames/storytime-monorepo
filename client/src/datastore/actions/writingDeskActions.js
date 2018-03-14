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

export const SAVE_DRAFT = 'SAVE_DRAFT'
export const saveDraft = () => ({
  type: SAVE_DRAFT
})

export const SAVED_DRAFT = 'SAVED_DRAFT'
export const savedDraft = nextDraft => ({
  type: SAVED_DRAFT,
  payload: {
    nextDraft
  }
})

export const SAVE_DRAFT_FAILED = 'SAVE_DRAFT_FAILED'
export const saveDraftFailed = error => ({
  type: SAVE_DRAFT_FAILED,
  payload: {
    error
  },
  error: true
})

export const saveDraftSummary = (draftSummary) => {
  return (dispatch) => {
    dispatch(saveDraft())
    const saveAPI = (draftSummary.storyId) ? authorApi.updateDraft : authorApi.createDraft
    saveAPI(draftSummary,
      nextSummary => dispatch(savedDraft(nextSummary)),
      error => dispatch(saveDraftFailed(error))
    )
  }
}

export const retrieveDraft = (storyId) => {
  return (dispatch) => {
    console.log('implement me')
  }
}