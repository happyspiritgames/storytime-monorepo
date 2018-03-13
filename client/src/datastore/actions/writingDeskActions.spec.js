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
})