import { combineReducers } from 'redux'
import account from './account'
import drafts from './drafts'
import library from './library'
import player from './player'
import reader from './reader'
import stories from './stories'
import writingDesk from './writingDesk'

const storyTimeApp = combineReducers({
  account,
  drafts,
  library,
  player,
  reader,
  stories,
  writingDesk
})

export default storyTimeApp;

// for reference
export const dataShape = {
  app: {
    account: {
      editMode: true
    },
    library: {
      status: 'FETCHING',  // READY, FETCHING
      catalog: ['abc', 'abd', 'abe', 'abf', 'abg', 'abh'],
      featured: {
        storyId: 'abc',
        specialMessage: 'On sale this month'
      }
    },
    reader: {
      status: 'READY',  // READY, FETCHING
      storyId: 'abc',
      sceneId: '42',
      history: ['37', '42'],
      errors: [],
      showErrors: false  // hides error messages from player
    },
    writingDesk: {
      status: 'FETCHING',  // READY, FETCHING
      activeDraft: {
        summary: {},
        scenes: {}
      },
      draftProjects: ['abc', 'blargy'],
    }
  },
  drafts: {
    'abc': {},
    'blargy': {}
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
}
