import PropTypes from 'prop-types'

export const storySummaryShape = PropTypes.shape({
  storyId: PropTypes.string,
  title: PropTypes.string,
  penName: PropTypes.string,
  tagLine: PropTypes.string,
  about: PropTypes.string,
  firstSceneId: PropTypes.string,
  publishedAt: PropTypes.string
})

export const sceneShape = PropTypes.shape({
  sceneId: PropTypes.string,
  title: PropTypes.string,
  prose: PropTypes.string,
  signpost: PropTypes.array
})

export const playerProfileShape = PropTypes.shape({
  id: PropTypes.string,
  email: PropTypes.string,
  nickname: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.number,
  emailOptInAt: PropTypes.string,
  authorOptInAt: PropTypes.string,
  penName: PropTypes.string
})

export const profileChangeShape = PropTypes.shape({
  id: PropTypes.string,
  nickname: PropTypes.string,
  emailOptIn: PropTypes.bool,
  penName: PropTypes.string
})

export const draftSummaryShape = PropTypes.shape({
  storyId: PropTypes.string,
  title: PropTypes.string,
  tagLine: PropTypes.string,
  about: PropTypes.string,
  firstSceneId: PropTypes.string,
  createdAt: PropTypes.string,
  lastUpdatedAt: PropTypes.string
})

export const draftSceneShape = PropTypes.shape({
  sceneId: PropTypes.string,
  title: PropTypes.string,
  prose: PropTypes.string,
  signpost: PropTypes.array
})

export const draftShape = PropTypes.shape({
  summary: draftSummaryShape,
  scenes: PropTypes.object
})


// for reference
export const reduxStoreDataShape = {
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
      draftProjects: ['abc', 'blargy'],
      activeDraft: {
        summary: {},
        scenes: {}
      }
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
