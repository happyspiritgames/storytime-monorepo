import * as actions from './index'

describe('player actions', () => {
  const testError = new Error('bah')
  const testProfile = {
    id: '8a095fb3-8cd3-475b-a3c2-a842bac9ee39',
    email: 'bubba@happyspiritgames.com',
    nickname: 'bubba',
    createdAt: '2018-01-26T00:02:21.635Z',
    status: 1,
    emailOptInAt: '2018-02-09T17:55:09.176Z',
    authorOptInAt: null,
    penName: null
  }
  const profileUpdate = {
    id: '8a095fb3-8cd3-475b-a3c2-a842bac9ee39',
    nickname: 'bubba',
    emailOptIn: false,
    penName: null
  }

  it('creates FETCH_PROFILE action', () => {
    expect(actions.fetchProfile())
    .toEqual({
      type: actions.FETCH_PROFILE
    })
  })
  it('creates FETCHED_PROFILE action', () => {
    expect(actions.fetchedProfile(testProfile))
    .toEqual({
      type: actions.FETCHED_PROFILE,
      payload: {
        profile: testProfile
      }
    })
  })
  it('creates FETCH_PROFILE_FAILED action', () => {
    expect(actions.fetchProfileFailed(testError))
    .toEqual({
      type: actions.FETCH_PROFILE_FAILED,
      payload: testError,
      error: true
    })
  })

  it('creates EDIT_PROFILE action', () => {
    expect(actions.editProfile())
    .toEqual({
      type: actions.EDIT_PROFILE
    })
  })

  it('creates CHANGE_PROFILE action', () => {
    expect(actions.changeProfile(profileUpdate))
    .toEqual({
      type: actions.CHANGE_PROFILE,
      payload: {
        profileUpdate
      }
    })
  })

  it('creates UPDATE_PROFILE action', () => {
    expect(actions.updateProfile())
    .toEqual({
      type: actions.UPDATE_PROFILE
    })
  })
  it('creates UPDATED_PROFILE action', () => {
    expect(actions.updatedProfile(testProfile))
    .toEqual({
      type: actions.UPDATED_PROFILE,
      payload: {
        profile: testProfile
      }
    })
  })
  it('creates UPDATE_PROFILE_FAILED action', () => {
    expect(actions.updateProfileFailed(testError))
    .toEqual({
      type: actions.UPDATE_PROFILE_FAILED,
      payload: testError,
      error: true
    })
  })

  it('creates FETCH_ROLES action', () => {
    expect(actions.fetchRoles())
    .toEqual({
      type: actions.FETCH_ROLES
    })
  })
  it('creates FETCHED_ROLES action', () => {
    const testRoles = ['player', 'admin', 'critic']
    expect(actions.fetchedRoles(testRoles))
    .toEqual({
      type: actions.FETCHED_ROLES,
      payload: {
        roles: testRoles
      }
    })
  })
  it('creates FETCH_ROLES_FAILED action', () => {
    expect(actions.fetchRolesFailed(testError))
    .toEqual({
      type: actions.FETCH_ROLES_FAILED,
      payload: testError,
      error: true
    })
  })
})