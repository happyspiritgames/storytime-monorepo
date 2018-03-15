import writingDesk, { initialState, writingDeskStates } from './writingDesk'
import * as actions from '../actions'
import { testDraftSummaries, testFullDraft } from '../testData'

describe('writing desk reducer', () => {
  let nextState
  let testError = new Error('blah')

  it('should provide initial state', () => {
    expect(writingDesk(undefined, {})).toEqual(initialState)
  })

  it('handles LOAD_DRAFTS', () => {
    expect(writingDesk(undefined, actions.fetchDrafts()))
    .toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles LOADED_DRAFTS', () => {
    const storyIds = testDraftSummaries.map(story => story.storyId)
    nextState = writingDesk(undefined, actions.fetchedDrafts(testDraftSummaries))
    expect(nextState).toEqual({
      ...initialState,
      draftProjects: storyIds
    })
  })

  it('handles LOAD_DRAFTS_FAILED', () => {
    nextState = writingDesk(undefined, actions.fetchDraftsFailed(testError))
    expect(nextState).toEqual({
      ...initialState
    })
  })

  it('handles LOAD_DRAFT', () => {
    nextState = writingDesk(undefined, actions.loadDraft())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
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

  it('handles START_NEW_DRAFT', () => {
    nextState = writingDesk(undefined, actions.loadedDraft(testFullDraft))
    nextState = writingDesk(nextState, actions.startNewDraft())
    expect(nextState).toEqual({
      ...initialState,
    })
  })

  it('handles LOAD_DRAFT_SCENE', () => {
    nextState = writingDesk(undefined, actions.loadDraftScene())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles LOAD_DRAFT_SIGNPOST', () => {
    nextState = writingDesk(undefined, actions.loadDraftSignpost())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles SAVE_DRAFT_SIGNPOST', () => {
    nextState = writingDesk(undefined, actions.saveDraftSignpost())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.SAVING
    })
  })


})