import account, { initialState } from './account'
import * as actions from '../actions'

describe('account reducer', () => {
  let nextState

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
  const defaultProfileChanges = {
    id: testProfile.id,
    nickname: testProfile.nickname,
    emailOptIn: true,
    penName: null
  }

  it('provides initial state', () => {
    expect(account(undefined, {})).toEqual(initialState)
  })

  it('handles EDIT_PROFILE', () => {
    expect(account(undefined, actions.editProfile(testProfile)))
    .toEqual({
      ...initialState,
      editMode: true,
      profileChanges: {
        id: testProfile.id,
        nickname: testProfile.nickname,
        emailOptIn: true,
        penName: null
      }
    })
  })

  it('handles CHANGE_PROFILE', () => {
    const expectedTestProfileAfterChanges = {
      editMode: true,
      profileChanges: {
        ...defaultProfileChanges,
        nickname: 'kate the great weather machine',
        emailOptIn: false,
        penName: 'kate the great'
      }
    }
    nextState = account(undefined, actions.editProfile(testProfile))
    nextState = account(nextState, actions.changeProfile('nickname', 'kate the great weather machine'))
    nextState = account(nextState, actions.changeProfile('emailOptIn', false))
    nextState = account(nextState, actions.changeProfile('penName', 'kate the great'))
    expect(nextState)
    .toEqual(expectedTestProfileAfterChanges)
  })

  it('handles UPDATED_PROFILE', () => {
    nextState = account(undefined, actions.editProfile(testProfile))
    nextState = account(nextState, actions.updatedProfile())
    expect(nextState).toEqual({
      ...initialState,
      profileChanges: defaultProfileChanges,
      editMode: false
    })
  })
})