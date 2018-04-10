import editionsReducer, { initialState } from './editions'
import * as actions from '../actions'
import { testProfile } from '../testData'

describe('account reducer', () => {

  it('provides initial state', () => {
    expect(editionsReducer(undefined, {})).toEqual(initialState)
  })
})