import codes, { initialState } from './codes'
import * as actions from '../actions'
import { testCodes } from '../testData'

describe('codes reducer', () => {
  let nextState
  it('should initialize as expected', () => {
    nextState = codes(undefined, {})
    expect(nextState).toEqual(initialState)
  })

  it('should handle FETCHED_CODES action', () => {
    nextState = codes(undefined, actions.fetchedCodes('wumpus', testCodes))
    expect(nextState).toEqual({
      'wumpus': testCodes
    })
  })

  it('should handle FETCHED_CODES action multiple times without wipingn out previous', () => {
    nextState = codes(undefined, actions.fetchedCodes('wumpus', testCodes))
    nextState = codes(nextState, actions.fetchedCodes('wigwam', testCodes))
    expect(nextState).toEqual({
      'wumpus': testCodes,
      'wigwam': testCodes
    })
  })
})
