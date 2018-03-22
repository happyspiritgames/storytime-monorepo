import drafts, { initialState } from './drafts'
import * as actions from '../actions'
import { testDraftSummaries, testDraftSummary } from '../testData'
import { savedDraft } from '../actions';

describe('drafts reducer', () => {
  let nextState

  it('should provide initial state', () => {
    expect(drafts(undefined, {})).toEqual(initialState)
  })

  it('handles LOADED_DRAFTS', () => {
    nextState = drafts(undefined, actions.loadedDrafts(testDraftSummaries))
    expect(nextState).toEqual({
      [testDraftSummaries[0].storyId]: testDraftSummaries[0],
      [testDraftSummaries[1].storyId]: testDraftSummaries[1]
    })
  })

  it('should handle SAVED_DRAFT by adding draft to state', () => {
    nextState = drafts(undefined, actions.loadedDrafts(testDraftSummaries))
    nextState = drafts(nextState, savedDraft(testDraftSummary))
    expect(nextState).toEqual({
      [testDraftSummaries[0].storyId]: testDraftSummaries[0],
      [testDraftSummaries[1].storyId]: testDraftSummaries[1],
      [testDraftSummary.storyId]: testDraftSummary
    })
  })
})