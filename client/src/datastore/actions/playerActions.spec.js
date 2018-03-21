import * as actions from './index'
import { testError, testProfile } from '../testData'

describe('player actions', () => {
  it('creates LOGIN action', () => {
    expect(actions.login())
    .toEqual({
      type: actions.LOGIN
    })
  })
  it('creates LOGGED_IN action', () => {
    expect(actions.loggedIn('ID Token', 'Access Token'))
    .toEqual({
      type: actions.LOGGED_IN,
      payload: {
        idToken: 'ID Token',
        accessToken: 'Access Token'
      }
    })
  })
  it('creates LOGIN_FAILED action', () => {
    expect(actions.loginFailed(testError))
    .toEqual({
      type: actions.LOGIN_FAILED,
      payload: testError,
      error: true
    })
  })
  it('creates LOGOUT action', () => {
    expect(actions.logout())
    .toEqual({
      type: actions.LOGOUT
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

  it('creates FETCHED_ROLES action with one role if array is empty', () => {
    expect(actions.fetchedRoles([]))
    .toEqual({
      type: actions.FETCHED_ROLES,
      payload: {
        roles: ['noRoles']
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
    expect(actions.editProfile(testProfile))
    .toEqual({
      type: actions.EDIT_PROFILE
    })
  })

  it('creates STOP_EDIT_PROFILE action', () => {
    expect(actions.stopEditProfile(testProfile))
    .toEqual({
      type: actions.STOP_EDIT_PROFILE
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
})