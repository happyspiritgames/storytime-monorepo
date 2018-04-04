import * as actions from './index'
import { testCodes, testError } from '../testData'

describe('system actions', () => {
  it('creates FETCH_CODES action', () => {
    expect(actions.fetchCodes())
    .toEqual({
      type: actions.FETCH_CODES
    })
  })

  it('creates FETCHED_CODES action', () => {
    expect(actions.fetchedCodes('wumpus', testCodes))
    .toEqual({
      type: actions.FETCHED_CODES,
      payload: {
        type: 'wumpus',
        codes: testCodes
      }
    })
  })

  it('creates FETCH_CODES action', () => {
    expect(actions.fetchCodesFailed(testError))
    .toEqual({
      type: actions.FETCH_CODES_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })
})
