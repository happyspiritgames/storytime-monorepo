import * as actions from './index'

describe('player actions', () => {
  const testError = new Error('bah')

  it('creates FETCH_PROFILE action', () => {
    expect(actions.fetchProfile())
    .toEqual({
      type: actions.FETCH_PROFILE
    })
  })
  it('creates FETCHED_PROFILE action', () => {
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
  it('creates FETCH_ROLES action', () => {

  })
  it('creates FETCHED_ROLES action', () => {

  })
  it('creates FETCH_PROFILE action', () => {

  })
})