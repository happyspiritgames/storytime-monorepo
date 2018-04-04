import drafts, { initialState } from './drafts'
import { loadedDrafts, savedDraft } from '../actions';
import { testDraftSummaries, testDraftSummary } from '../testData'

describe('drafts reducer', () => {
  let nextState

  it('should provide initial state', () => {
    expect(drafts(undefined, {})).toEqual(initialState)
  })

  it('handles LOADED_DRAFTS', () => {
    nextState = drafts(undefined, loadedDrafts(testDraftSummaries))
    expect(nextState).toEqual({
      [testDraftSummaries[0].storyId]: testDraftSummaries[0],
      [testDraftSummaries[1].storyId]: testDraftSummaries[1]
    })
  })

  it('should handle SAVED_DRAFT by adding draft to state', () => {
    nextState = drafts(undefined, loadedDrafts(testDraftSummaries))
    nextState = drafts(nextState, savedDraft(testDraftSummary))
    expect(nextState).toEqual({
      [testDraftSummaries[0].storyId]: testDraftSummaries[0],
      [testDraftSummaries[1].storyId]: testDraftSummaries[1],
      [testDraftSummary.storyId]: testDraftSummary
    })
  })
})