import drafts, { initialState } from './drafts'
import * as actions from '../actions'
import { testDraftSummaries } from '../testData'

describe('drafts reducer', () => {
  let nextState

  it('should provide initial state', () => {
    expect(drafts(undefined, {})).toEqual(initialState)
  })

  it('handles LOADED_DRAFTS', () => {
    nextState = drafts(undefined, actions.fetchedDrafts(testDraftSummaries))
    expect(nextState).toEqual({
      [testDraftSummaries[0].storyId]: testDraftSummaries[0],
      [testDraftSummaries[1].storyId]: testDraftSummaries[1]
    })
  })
})