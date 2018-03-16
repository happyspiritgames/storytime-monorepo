import activeDraft, { initialState } from './activeDraft'
import * as actions from '../actions'
import { testFullDraft, testDraftScene, testSignpost } from '../testData'

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

  it('handles LOADED_DRAFT_SCENE', () => {
    nextState = activeDraft(undefined, actions.loadedDraftScene('myStory', testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      scenes: {
        [testDraftScene.sceneId]: testDraftScene
      }
    })
  })

  it('handles SAVED_DRAFT_SCENE', () => {
    nextState = activeDraft(undefined, actions.savedDraftScene('myStory', testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      scenes: {
        [testDraftScene.sceneId]: testDraftScene
      }
    })
  })

  it('handles LOADED_DRAFT_SIGNPOST', () => {
    nextState = activeDraft(undefined, actions.loadedDraftScene('myStory', testDraftScene))
    nextState = activeDraft(nextState,
      actions.loadedDraftSignpost('myStory', testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      scenes: {
        [testDraftScene.sceneId]: {
          ...testDraftScene,
          signpost: testSignpost
        }
      }
    })
  })

  it('handles SAVED_DRAFT_SIGNPOST', () => {
    nextState = activeDraft(undefined, actions.loadedDraftScene('myStory', testDraftScene))
    nextState = activeDraft(nextState,
      actions.savedDraftSignpost('myStory', testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      scenes: {
        [testDraftScene.sceneId]: {
          ...testDraftScene,
          signpost: testSignpost
        }
      }
    })
  })
})