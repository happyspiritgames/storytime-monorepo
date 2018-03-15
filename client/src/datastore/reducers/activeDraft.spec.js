import activeDraft, { initialState } from './activeDraft'
import * as actions from '../actions'
import { testFullDraft, testDraftScene } from '../testData'

describe('activeDraft reducer', () => {
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

  it('handles LOADED_DRAFT', () => {
    nextState = activeDraft(undefined, actions.loadedDraft(testFullDraft))
    expect(nextState).toEqual({
      summary: testFullDraft.summary,
      scenes: {
        [testFullDraft.scenes[0].sceneId]: testFullDraft.scenes[0]
      }
    })
  })

  xit('handles LOADED_DRAFT_SCENE', () => {
    nextState = activeDraft(undefined, actions.loadedDraftScene('myStory', testDraftScene))
    expect(nextState).toEqual({
      ...initialState
    })
  })

  xit('handles SAVED_DRAFT_SCENE')
  xit('handles LOADED_DRAFT_SIGNPOST')
  xit('handles SAVED_DRAFT_SIGNPOST')
})