import account from './account'
import * as actions from '../actions'

describe('account reducer', () => {
  it('provides initial state', () => {
    expect(account(undefined, {})).toEqual({
      editMode: false
    })
  })
})