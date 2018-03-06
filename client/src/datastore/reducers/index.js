import { combineReducers } from 'redux'
import library from './library'
import reader from './reader'
import stories from './stories'
import account from './account'
import player from './player'

const storyTimeApp = combineReducers({
  account,
  library,
  player,
  reader,
  stories
})

export default storyTimeApp;

// sample for reference
export const dataShape = {
  account: {
    editMode: true,
    profileUpdate: {
      id: '8a095fb3-8cd3-475b-a3c2-a842bac9ee39',
      nickname: 'bubba',
      emailOptIn: false,
      penName: null
    }
  },
  library: {
    status: 'FETCHING',  // READY, FETCHING
    catalog: ['abc', 'abd', 'abe', 'abf', 'abg', 'abh'],
    featured: {
      storyId: 'abc',
      specialMessage: 'On sale this month'
    }
  },
  player: {
    profile: {
      id: '8a095fb3-8cd3-475b-a3c2-a842bac9ee39',
      email: 'bubba@happyspiritgames.com',
      nickname: 'bubba',
      createdAt: '2018-01-26T00:02:21.635Z',
      status: 1,
      emailOptInAt: '2018-02-09T17:55:09.176Z',
      authorOptInAt: null,
      penName: null
    },
    roles: ['player', 'author', 'admin', 'slacker'],
    sessionKey: 'blargy-random-blargy-123'
  },
  reader: {
    status: 'READY',  // READY, FETCHING
    storyId: 'abc',
    sceneId: '42',
    history: ['37', '42'],
    errors: [],
    showErrors: false  // hides error messages from player
  },
  stories: {
    'abc': {
      summary: {
      },
      scenes: {
        '37': {},
        '42': {},
        '99': {}
      }
    },
    'abd': {},
    'abe': {},
    'abf': {},
    'abg': {},
    'abh': {}
  },
  writingdesk: {
    draft: {
      summary: {},
      scenes: {}
    }
  }
}
