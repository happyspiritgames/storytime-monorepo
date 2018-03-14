import activeDraft, { initialState } from './activeDraft'
import * as actions from '../actions'

describe('drafts reducer', () => {
  let nextState

  it('should provide initial state', () => {
    expect(activeDraft(undefined, {})).toEqual(initialState)
  })

  it('handles SAVED_DRAFT', () => {
    const testSummary = {
      storyId: 'blargy',
      title: 'hello world wide web',
      createdAt: 'timestamp-blah-blah-T123'
    }
    nextState = activeDraft(undefined, actions.savedDraft(testSummary))
    expect(nextState).toEqual({
      ...initialState,
      summary: testSummary
    })
  })
})