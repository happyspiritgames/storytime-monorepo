import writingDesk, { initialState, writingDeskStates } from './writingDesk'
import * as actions from '../actions'
import {
  testDraftSummaries,
  testFullDraft,
  testDraftScene,
  testSignpost,
  testProof
} from '../testData'

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
      },
      draftProjects: [testDraftSummaries[1].storyId]
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
    nextState = writingDesk(undefined, actions.loadedDraftScene(testDraftScene))
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
    nextState = writingDesk(undefined, actions.savedDraftScene(testDraftScene))
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

  it('handles LOADED_DRAFT_SIGNPOST', () => {
    nextState = writingDesk(undefined, actions.loadedDraftScene(testDraftScene))
    nextState = writingDesk(nextState,
      actions.loadedDraftSignpost(testDraftScene.sceneId, testSignpost))
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
    nextState = writingDesk(undefined, actions.loadedDraftScene(testDraftScene))
    nextState = writingDesk(nextState,
      actions.savedDraftSignpost(testDraftScene.sceneId, testSignpost))
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

  it('handles START_TO_PUBLISH', () => {
    nextState = writingDesk(undefined, actions.startToPublish())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles STARTED_TO_PUBLISH', () => {
    const expectedKey = `${testProof.draftId}-${testProof.version}`
    nextState = writingDesk(undefined, actions.startedToPublish(testProof))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeProof: 'abcdef-1',
      proofs: {
        [expectedKey]: testProof
      }
    })
  })

  it('handles START_TO_PUBLISH_FAILED', () => {
    nextState = writingDesk(undefined, actions.startToPublish())
    nextState = writingDesk(nextState, actions.startToPublishFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles FETCH_PROOFS', () => {
    nextState = writingDesk(undefined, actions.fetchProofs())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles FETCHED_PROOFS', () => {
    const expectedKey1 = `${testProof.draftId}-${testProof.version}`
    const testProof2 = { ...testProof }
    testProof2.version = '2'
    const expectedKey2 = `${testProof2.draftId}-${testProof2.version}`
    nextState = writingDesk(undefined, actions.fetchedProofs([testProof, testProof2]))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      proofs: {
        [expectedKey1]: testProof,
        [expectedKey2]: testProof2
      }
    })
  })

  it('handles FETCH_PROOFS_FAILED', () => {
    nextState = writingDesk(undefined, actions.fetchProofs())
    nextState = writingDesk(nextState, actions.fetchProofsFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles FETCH_PROOF', () => {
    nextState = writingDesk(undefined, actions.fetchProof())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles FETCHED_PROOF', () => {
    const expectedKey = `${testProof.draftId}-${testProof.version}`
    nextState = writingDesk(undefined, actions.fetchedProof(testProof))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeProof: 'abcdef-1',
      proofs: {
        [expectedKey]: testProof
      }
    })
  })

  it('handles FETCH_PROOF_FAILED', () => {
    nextState = writingDesk(undefined, actions.fetchProof())
    nextState = writingDesk(nextState, actions.fetchProofFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles UPDATE_PROOF', () => {
    nextState = writingDesk(undefined, actions.updateProof())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.SAVING
    })
  })

  it('handles UPDATED_PROOF', () => {
    const expectedKey = `${testProof.draftId}-${testProof.version}`
    nextState = writingDesk(undefined, actions.updatedProof(testProof))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeProof: 'abcdef-1',
      proofs: {
        [expectedKey]: testProof
      }
    })
  })

  it('handles UPDATE_PROOF_FAILED', () => {
    nextState = writingDesk(undefined, actions.updateProof())
    nextState = writingDesk(nextState, actions.updateProofFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles PUBLISH', () => {
    nextState = writingDesk(undefined, actions.sendPublish())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.PUBLISHING
    })
  })

  it('handles PUBLISHED', () => {
    nextState = writingDesk(undefined, actions.sendPublish())
    nextState = writingDesk(nextState, actions.published(testProof))
    const expectedKey = `${testProof.draftId}-${testProof.version}`
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeProof: 'abcdef-1',
      proofs: {
        [expectedKey]: testProof
      }
    })
  })

  it('handles PUBLISH_FAILED', () => {
    nextState = writingDesk(undefined, actions.sendPublish())
    nextState = writingDesk(nextState, actions.sendPublishFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })
})