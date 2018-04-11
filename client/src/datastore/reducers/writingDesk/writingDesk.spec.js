import writingDesk, { initialState, writingDeskStates } from './index'
import * as actions from '../../actions'
import {
  testDraftSummaries,
  testFullDraft,
  testDraftScene,
  testSignpost,
  testEdition,
  testError
} from '../../testData'

describe('writing desk reducer', () => {
  let nextState

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

  it('handles CREATE_EDITION', () => {
    nextState = writingDesk(undefined, actions.createEdition())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles CREATED_EDITION', () => {
    nextState = writingDesk(undefined, actions.createdEdition(testEdition))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeEdition: testEdition.editionKey
    })
  })

  it('handles CREATE_EDITION_FAILED', () => {
    nextState = writingDesk(undefined, actions.createEdition())
    nextState = writingDesk(nextState, actions.createEditionFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles FETCH_EDITIONS', () => {
    nextState = writingDesk(undefined, actions.fetchEditions())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles FETCHED_EDITIONS', () => {
    const testEdition2 = { ...testEdition }
    testEdition2.version = '2'
    testEdition2.editionKey = `${testEdition2.storyId}-${testEdition2.version}`
    nextState = writingDesk(undefined, actions.fetchedEditions([testEdition, testEdition2]))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles FETCH_EDITIONS_FAILED', () => {
    nextState = writingDesk(undefined, actions.fetchEditions())
    nextState = writingDesk(nextState, actions.fetchEditionsFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles FETCH_EDITION', () => {
    nextState = writingDesk(undefined, actions.fetchEdition())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.LOADING
    })
  })

  it('handles FETCHED_EDITION', () => {
    nextState = writingDesk(undefined, actions.fetchedEdition(testEdition))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeEdition: testEdition.editionKey,
      editions: {
        [testEdition.editionKey]: testEdition
      }
    })
  })

  it('handles FETCH_EDITION_FAILED', () => {
    nextState = writingDesk(undefined, actions.fetchEdition())
    nextState = writingDesk(nextState, actions.fetchEditionFailed(testError))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY
    })
  })

  it('handles SAVE_EDITION', () => {
    nextState = writingDesk(undefined, actions.saveEdition())
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.SAVING
    })
  })

  it('handles SAVED_EDITION', () => {
    nextState = writingDesk(undefined, actions.savedEdition(testEdition))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeEdition: testEdition.editionKey,
      editions: {
        [testEdition.editionKey]: testEdition
      }
    })
  })

  it('handles SAVE_EDITION_FAILED', () => {
    nextState = writingDesk(undefined, actions.saveEdition())
    nextState = writingDesk(nextState, actions.saveEditionFailed(testError))
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
    nextState = writingDesk(nextState, actions.published(testEdition))
    expect(nextState).toEqual({
      ...initialState,
      status: writingDeskStates.READY,
      activeEdition: testEdition.editionKey,
      editions: {
        [testEdition.editionKey]: testEdition
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