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

export const proofShape = PropTypes.shape({
  draftId: PropTypes.string,
  version: PropTypes.string,
  storyKey: PropTypes.string,
  authorId: PropTypes.string,
  penName: PropTypes.string,
  title: PropTypes.string,
  tagLine: PropTypes.string,
  about: PropTypes.string,
  rating: PropTypes.string,
  genre: PropTypes.arrayOf(PropTypes.string),
  firstSceneId: PropTypes.string,
  publishedAt: PropTypes.string
})

export const codeLookupShape = PropTypes.shape({
  code: PropTypes.string,
  displayName: PropTypes.string,
  sortOrder: PropTypes.integer
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
        scenes: {
          '1': {
            sceneId: '1',
            title: 'First Scene',
            prose: 'Stuff happens',
            endPrompt: 'Now what?',
            signpost: [
              {
                destinationId: '42',
                teaser: 'Do this',
                order: 1
              }
            ]
          },
          '42': {}
        }
      },
      activeProof: 'abcdef-1',
      proofs: {
        'abcdef-1': {
          draftId: 'abcdef',
          version: '1',
          storyKey: 'abcdef',
          author: '8a095fb3-8cd3-475b-a3c2-a842bac9ee39',
          penName: 'bubba',
          title: 'Blargy',
          tagLine: 'Blargy blargy.',
          about: 'Blargy blargy, blargy blargy',
          rating: 'PG',
          genre: ['scifi'],
          firstSceneId: 'jhu3248',
          publishedAt: '2018-01-26T00:02:21.635Z'
        }
      }
    },
  },
  codeLookup: {
    genre: [],
    rating: [],
    'player-status': [],
  },
  drafts: {
    'abc': {},
    'blargy': {}
  },
  player: {
    accessToken: 'asdlkjfaiuh3f3nw3jincianhfjafnphn98cDfafesdFaeaFDSFAE$A',
    idToken: 'blargy-random-blargy-123',
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
    userLoggedOut: false
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
