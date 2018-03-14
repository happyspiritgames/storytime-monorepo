import * as actions from './index'
import { testDraftSummaries } from '../testData'

describe('writing desk actions', () => {
  const testError = new Error('bah')

  it('creates FETCH_DRAFTS action', () => {
    expect(actions.fetchDrafts())
    .toEqual({
      type: actions.FETCH_DRAFTS
    })
  })

  it('creates FETCHED_DRAFTS action', () => {
    expect(actions.fetchedDrafts(testDraftSummaries))
    .toEqual({
      type: actions.FETCHED_DRAFTS,
      payload: {
        drafts: testDraftSummaries
      }
    })
  })

  it('creates FETCH_DRAFTS_FAILED action', () => {
    expect(actions.fetchDraftsFailed(testError))
    .toEqual({
      type: actions.FETCH_DRAFTS_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates SAVE_DRAFT action', () => {
    expect(actions.saveDraft())
    .toEqual({
      type: actions.SAVE_DRAFT
    })
  })

  it('creates SAVED_DRAFT action', () => {
    expect(actions.savedDraft({
      storyId: 'blargy',
      title: 'Hello World'
    }))
    .toEqual({
      type: actions.SAVED_DRAFT,
      payload: {
        nextDraft: {
          storyId: 'blargy',
          title: 'Hello World'
        }
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
    expect(actions.loadedDraft({
      storyId: 'blargy',
      title: 'Hello World'
    }))
    .toEqual({
      type: actions.LOADED_DRAFT,
      payload: {
        draft: {
          storyId: 'blargy',
          title: 'Hello World'
        }
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
})