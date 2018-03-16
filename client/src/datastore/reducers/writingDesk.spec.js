import writingDesk, { initialState, writingDeskStates } from './writingDesk'
import * as actions from '../actions'
import { testDraftSummaries, testFullDraft, testDraftScene, testSignpost } from '../testData'

describe('writing desk reducer', () => {
  let nextState
  let testError = new Error('blah')

  it('should provide initial state', () => {
    expect(writingDesk(undefined, {})).toEqual(initialState)
  })

  it('handles LOAD_DRAFTS', () => {
    expect(writingDesk(undefined, actions.loadDrafts()))
    .toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles LOADED_DRAFTS', () => {
    const storyIds = testDraftSummaries.map(story => story.storyId)
    nextState = writingDesk(undefined, actions.loadedDrafts(testDraftSummaries))
    expect(nextState).toEqual({
      ...initialState,
      draftProjects: storyIds
    })
  })

  it('handles LOAD_DRAFTS_FAILED', () => {
    nextState = writingDesk(undefined, actions.loadDrafts())
    nextState = writingDesk(nextState, actions.loadDraftsFailed(testError))
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
    nextState = writingDesk(undefined, actions.loadDraft())
    nextState = writingDesk(nextState, actions.loadDraftFailed(testError))
    expect(nextState).toEqual({
      ...initialState
    })
  })

  it('handles SAVE_DRAFT', () => {
    nextState = writingDesk(undefined, actions.saveDraft())
    expect(nextState)
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

  it('handles LOADED_DRAFT_SCENE', () => {
    nextState = writingDesk(undefined, actions.loadedDraftScene('blargy', testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      activeDraft: {
        summary: {},
        scenes: {
          [testDraftScene.sceneId]: testDraftScene
        }
      },
      status: writingDeskStates.READY
    })
  })

  it('handles LOAD_DRAFT_SCENE_FAILED', () => {
    nextState = writingDesk(undefined, actions.loadDraftScene())
    nextState = writingDesk(nextState, actions.loadDraftSceneFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles SAVE_DRAFT_SCENE', () => {
    nextState = writingDesk(undefined, actions.saveDraftScene())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.SAVING
    })
  })

  it('handles SAVED_DRAFT_SCENE', () => {
    nextState = writingDesk(undefined, actions.savedDraftScene('blargy', testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      activeDraft: {
        summary: {},
        scenes: {
          [testDraftScene.sceneId]: testDraftScene
        }
      },
      status: writingDeskStates.READY
    })
  })

  it('handles SAVE_DRAFT_SCENE_FAILED', () => {
    nextState = writingDesk(undefined, actions.saveDraftSceneFailed())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles LOAD_DRAFT_SIGNPOST', () => {
    nextState = writingDesk(undefined, actions.loadDraftSignpost())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles LOADED_DRAFT_SCENE', () => {
    nextState = writingDesk(undefined, actions.loadedDraftScene('blargy', testDraftScene))
    nextState = writingDesk(nextState,
      actions.loadedDraftSignpost('blargy', testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      activeDraft: {
        summary: {},
        scenes: {
          [testDraftScene.sceneId]: {
            ...testDraftScene,
            signpost: testSignpost
          }
        }
      },
      status: writingDeskStates.READY
    })
  })

  it('handles LOAD_DRAFT_SIGNPOST_FAILED', () => {
    nextState = writingDesk(undefined, actions.loadDraftSignpost())
    nextState = writingDesk(nextState, actions.loadDraftSignpostFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles SAVE_DRAFT_SIGNPOST', () => {
    nextState = writingDesk(undefined, actions.saveDraftSignpost())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.SAVING
    })
  })

  it('handles SAVED_DRAFT_SIGNPOST', () => {
    nextState = writingDesk(undefined, actions.loadedDraftScene('blargy', testDraftScene))
    nextState = writingDesk(nextState,
      actions.savedDraftSignpost('blargy', testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      activeDraft: {
        summary: {},
        scenes: {
          [testDraftScene.sceneId]: {
            ...testDraftScene,
            signpost: testSignpost
          }
        }
      },
      status: writingDeskStates.READY
    })
  })

  it('handles SAVE_DRAFT_SIGNPOST_FAILED', () => {
    nextState = writingDesk(undefined, actions.saveDraftSignpost())
    nextState = writingDesk(nextState, actions.saveDraftSignpostFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })
})