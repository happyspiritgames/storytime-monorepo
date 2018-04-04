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
})
