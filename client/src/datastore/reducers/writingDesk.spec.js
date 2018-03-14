import writingDesk, { initialState, writingDeskStates } from './writingDesk'
import * as actions from '../actions'
import { testDraftSummaries, testFullDraft } from '../testData'

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

  it('handles LOAD_DRAFT', () => {
    nextState = writingDesk(undefined, actions.loadDraft())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.FETCHING
    })
  })

  it('handles LOADED_DRAFT', () => {
    nextState = writingDesk(undefined, actions.loadedDraft(testFullDraft))
    expect(nextState).toEqual({
      ...initialState,
      activeDraft: {
        summary: testFullDraft.summary,
        scenes: {
          'twjj3gx3': testFullDraft.scenes[0]
        }
      }
    })
  })

  it('handles LOAD_DRAFT_FAILED', () => {
    nextState = writingDesk(undefined, actions.loadDraftFailed(testError))
    expect(nextState).toEqual({
      ...initialState
    })
  })

  it('handles SAVE_DRAFT', () => {
    expect(writingDesk(undefined, actions.saveDraft()))
    .toEqual({
      ...initialState,
      status: writingDeskStates.SAVING
    })
  })

  it('handles SAVED_DRAFT', () => {
    nextState = writingDesk(undefined, actions.savedDraft(testDraftSummaries[1]))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeDraft: {
        summary: testDraftSummaries[1],
        scenes: {}
      }
    })
  })

  it('handles SAVE_DRAFT_FAILED', () => {
    nextState = writingDesk(undefined, actions.saveDraft())
    nextState = writingDesk(nextState, actions.saveDraftFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

})