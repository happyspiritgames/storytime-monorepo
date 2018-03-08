import account, { initialState } from './account'
import * as actions from '../actions'

describe('account reducer', () => {
  const testProfile = {
    id: '88888888-8888-4888-8888-888888888888',
    email: 'bubba@happyspiritgames.com',
    nickname: 'bubba',
    createdAt: '2018-01-26T00:02:21.635Z',
    status: 1,
    emailOptInAt: '2018-02-09T17:55:09.176Z',
    authorOptInAt: null,
    penName: null
  }

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