import account, { initialState } from './account'
import * as actions from '../actions'
import { testProfile } from '../testData'

describe('account reducer', () => {

  it('provides initial state', () => {
    expect(account(undefined, {})).toEqual(initialState)
  })

  it('handles EDIT_PROFILE', () => {
    expect(account(undefined, actions.editProfile()))
    .toEqual({
      ...initialState,
      editMode: true
    })
  })

  it('handles STOP_EDIT_PROFILE', () => {
    expect(account(undefined, actions.stopEditProfile()))
    .toEqual({
      ...initialState,
      editMode: false
    })
  })

  it('handles UPDATED_PROFILE', () => {
    expect(account(undefined, actions.updatedProfile(testProfile)))
    .toEqual({
      ...initialState,
      editMode: false
    })
  })
})