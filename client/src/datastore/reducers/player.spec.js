import player, { initialState } from './player'
import * as actions from '../actions'
import { testProfile } from '../testData'

describe('player reducer', () => {
  let nextState

  it('provides initial state', () => {
    expect(player(undefined, {})).toEqual(initialState)
  })

  it('handles LOGGED_IN', () => {
    expect(player(undefined, actions.loggedIn('ID token', 'Access Token')))
    .toEqual({
      ...initialState,
      idToken: 'ID token',
      accessToken: 'Access Token',
      userLoggedOut: false
    })
  })

  it('handles LOGOUT', () => {
    nextState = player(undefined, actions.loggedIn('ID123', 'AccessABC'))
    expect(player(nextState, actions.logout()))
    .toEqual({
      ...initialState,
      userLoggedOut: true
    })
  })

  it('handles FETCHED_PROFILE', () => {
    expect(player(undefined, actions.fetchedProfile(testProfile)))
    .toEqual({
      ...initialState,
      profile: testProfile
    })
  })

  it('handles UPDATED_PROFILE', () => {
    expect(player(undefined, actions.updatedProfile(testProfile)))
    .toEqual({
      ...initialState,
      profile: testProfile
    })
  })

  it('handles FETCHED_ROLES', () => {
    const testRoles = ['admin', 'player']
    expect(player(undefined, actions.fetchedRoles(testRoles)))
    .toEqual({
      ...initialState,
      roles: testRoles
    })
  })

  it('handles FETCHED_ROLES_FAILED', () => {
    expect(player(undefined, actions.fetchRolesFailed([])))
    .toEqual({
      ...initialState,
      roles: ['noRoles-fetchFailed']
    })
  })
})