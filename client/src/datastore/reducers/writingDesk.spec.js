import writingDesk, { initialState, writingDeskStates } from './writingDesk'
import * as actions from '../actions'
import { testDraftSummaries } from '../testData'

describe('writing desk reducer', () => {
  let nextState
  let testError = new Error('blah')

  it('should provide initial state', () => {
    expect(writingDesk(undefined, {})).toEqual(initialState)
  })

  it('handles FETCH_DRAFTS', () => {
    expect(writingDesk(undefined, actions.fetchDrafts()))
    .toEqual({
      ...initialState,
      status: writingDeskStates.FETCHING
    })
  })

  it('handles FETCHED_DRAFTS', () => {
    const storyIds = testDraftSummaries.map(story => story.storyId)
    nextState = writingDesk(undefined, actions.fetchedDrafts(testDraftSummaries))
    expect(nextState).toEqual({
      ...initialState,
      draftProjects: storyIds
    })
  })

  it('handles FETCH_DRAFTS_FAILED', () => {
    nextState = writingDesk(undefined, actions.fetchDraftsFailed(testError))
    expect(nextState).toEqual({
      ...initialState
    })
  })

})