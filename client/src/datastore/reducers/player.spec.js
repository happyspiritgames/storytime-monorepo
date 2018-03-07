import player, { initialState } from './player'
import * as actions from '../actions'

describe('player reducer', () => {
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
    expect(player(undefined, {})).toEqual(initialState)
  })

  it('handles FETCHED_PROFILE', () => {
    expect(player(undefined, actions.fetchedProfile(testProfile)))
    .toEqual({
      profile: testProfile
    })
  })

  it('handles UPDATED_PROFILE', () => {
    expect(player(undefined, actions.updatedProfile(testProfile)))
    .toEqual({
      profile: testProfile
    })
  })
})