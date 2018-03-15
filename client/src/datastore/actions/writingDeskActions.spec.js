import * as actions from './index'
import {
  testDraftSummaries,
  testDraftSummary,
  testDraftScene,
  testSignpost
} from '../testData'

describe('writing desk actions', () => {
  const testError = new Error('bah')

  it('creates LOAD_DRAFTS action', () => {
    expect(actions.fetchDrafts())
    .toEqual({
      type: actions.LOAD_DRAFTS
    })
  })

  it('creates LOADED_DRAFTS action', () => {
    expect(actions.fetchedDrafts(testDraftSummaries))
    .toEqual({
      type: actions.LOADED_DRAFTS,
      payload: {
        drafts: testDraftSummaries
      }
    })
  })

  it('creates LOAD_DRAFTS_FAILED action', () => {
    expect(actions.fetchDraftsFailed(testError))
    .toEqual({
      type: actions.LOAD_DRAFTS_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates START_NEW_DRAFT action', () => {
    expect(actions.startNewDraft())
    .toEqual({
      type: actions.START_NEW_DRAFT
    })
  })

  it('creates SAVE_DRAFT action', () => {
    expect(actions.saveDraft())
    .toEqual({
      type: actions.SAVE_DRAFT
    })
  })

  it('creates SAVED_DRAFT action', () => {
    expect(actions.savedDraft(testDraftSummary))
    .toEqual({
      type: actions.SAVED_DRAFT,
      payload: {
        nextDraft: testDraftSummary
      }
    })
  })

  it('creates SAVE_DRAFT_FAILED action', () => {
    expect(actions.saveDraftFailed(testError))
    .toEqual({
      type: actions.SAVE_DRAFT_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates LOAD_DRAFT action', () => {
    expect(actions.loadDraft())
    .toEqual({
      type: actions.LOAD_DRAFT
    })
  })

  it('creates LOADED_DRAFT action', () => {
    expect(actions.loadedDraft(testDraftSummary))
    .toEqual({
      type: actions.LOADED_DRAFT,
      payload: {
        draft: testDraftSummary
      }
    })
  })

  it('creates LOAD_DRAFT_FAILED action', () => {
    expect(actions.loadDraftFailed(testError))
    .toEqual({
      type: actions.LOAD_DRAFT_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates SAVE_DRAFT_SCENE action', () => {
    expect(actions.saveDraftScene())
    .toEqual({
      type: actions.SAVE_DRAFT_SCENE
    })
  })

  it('creates SAVED_DRAFT_SCENE action', () => {
    expect(actions.savedDraftScene('wumpus', testDraftScene))
    .toEqual({
      type: actions.SAVED_DRAFT_SCENE,
      payload: {
        storyId: 'wumpus',
        scene: testDraftScene
      }
    })
  })

  it('creates SAVE_DRAFT_SCENE_FAILED action', () => {
    expect(actions.saveDraftSceneFailed(testError))
    .toEqual({
      type: actions.SAVE_DRAFT_SCENE_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates LOAD_DRAFT_SCENE action', () => {
    expect(actions.loadDraftScene())
    .toEqual({
      type: actions.LOAD_DRAFT_SCENE
    })
  })

  it('creates LOADED_DRAFT_SCENE action', () => {
    expect(actions.loadedDraftScene('wumpus', testDraftScene))
    .toEqual({
      type: actions.LOADED_DRAFT_SCENE,
      payload: {
        storyId: 'wumpus',
        scene: testDraftScene
      }
    })
  })

  it('creates LOAD_DRAFT_SCENE_FAILED action', () => {
    expect(actions.loadDraftSceneFailed(testError))
    .toEqual({
      type: actions.LOAD_DRAFT_SCENE_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates LOAD_DRAFT_SIGNPOST action', () => {
    expect(actions.loadDraftSignpost())
    .toEqual({
      type: actions.LOAD_DRAFT_SIGNPOST
    })
  })

  it('creates LOADED_DRAFT_SIGNPOST action', () => {
    expect(actions.loadedDraftSignpost('wumpus', '1', testSignpost))
    .toEqual({
      type: actions.LOADED_DRAFT_SIGNPOST,
      payload: {
        storyId: 'wumpus',
        sceneId: '1',
        signpost: testSignpost
      }
    })
  })

  it('creates LOAD_DRAFT_SIGNPOST_FAILED action', () => {
    expect(actions.loadDraftSignpostFailed(testError))
    .toEqual({
      type: actions.LOAD_DRAFT_SIGNPOST_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates SAVE_DRAFT_SIGNPOST action', () => {
    expect(actions.saveDraftSignpost())
    .toEqual({
      type: actions.SAVE_DRAFT_SIGNPOST
    })
  })

  it('creates SAVED_DRAFT_SIGNPOST action', () => {
    expect(actions.savedDraftSignpost('wumpus', '1', testSignpost))
    .toEqual({
      type: actions.SAVED_DRAFT_SIGNPOST,
      payload: {
        storyId: 'wumpus',
        sceneId: '1',
        signpost: testSignpost
      }
    })
  })

  it('creates SAVE_DRAFT_SIGNPOST_FAILED action', () => {
    expect(actions.saveDraftSignpostFailed(testError))
    .toEqual({
      type: actions.SAVE_DRAFT_SIGNPOST_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })


})