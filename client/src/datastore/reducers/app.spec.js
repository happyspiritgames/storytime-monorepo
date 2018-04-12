import appReducer, { initialState } from './app'
import * as actions from '../actions'
import { testProfile } from '../testData'

describe('account reducer', () => {

  it('provides initial state', () => {
    expect(appReducer(undefined, {})).toEqual(initialState)
  })
})