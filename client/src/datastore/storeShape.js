// only for reference
export const reduxStoreDataShape = {
  account: {
    editMode: true
  },
  app: {
    status: 'FETCHING' || 'LOADING' || 'SAVING' || 'READY',
    messages: [
      'The story you were looking for is lost. Are you sure it exists?',
      'Something bad happened in our backend. Glad it\'s not happening to your backend, aren\'t you?'
    ]
  },
  codes: {
    'edition-status': [],
    genre: [],
    rating: [],
    'player-status': []
  },
  drafts: {
    'abc': {},
    'blargy': {}
  },
  editions: {
    'abe-1': {
      editionKey: 'dkwij3jk-1',
      storyId: 'dkwij3jk',
      version: '1',
      status: 'available',
      summary: {
        title: 'The Blargy Boat',
        penName: 'Mr. Soggy Bottoms',
        tagLine: 'Are you ready to get wet, boys and girls?',
        about: 'This is a high-seas adventure for all you land-lubbin\' kiddies. Just on my boat, and let\'s go!',
        firstSceneId: 'a0wumpus'
      },
      rating: 'Y',
      genre: ['adventure', 'fantasy'],
      publishedAt: '2018-01-26T00:02:21.635Z',
      scenes: {
        'a0wupmus': {
          title: 'Off to a good start',
          prose: 'Stuff happens',
          endPrompt: 'Now what?',
          signpost: [
            {
              destinationId: 'b1wumpus',
              teaser: 'Do this'
            },
            {
              destinationId: 'c2wumpus',
              teaser: 'Do that'
            },
          ]
        },
        'b1wumpus': {},
        'c2wumpus': {}
      }
    },
    'abf-4': {}
    // and so on
  },
  library: {
    status: 'FETCHING',  // READY, FETCHING,
    isLoaded: true,
    catalog: {
      editions: ['abc-1', 'abd-2', 'abe-1', 'abf-4', 'abg-2', 'abh-13'],
      byGenre: {
        'adventure': ['abe-1', 'abf-4'],
        'fantasy': ['abe-1', 'abg-2'],
        'mystery': ['abc-1', 'abd-2', 'abh-2'],
        'biography': ['abh-13']
      },
      byRating: {
        'Y': ['abe-1'],
        'Y7': [],
        'G': ['abc-1', 'abh-13'],
        'PG': ['abd-2', 'abf-4'],
        '14': [],
        'MA': ['abg-2']
      },
    },
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
  reader: {
    status: 'READY',  // READY, FETCHING
    activeEdition: 'abcdefgh-1',
    activeScene: 'kii23i34',
    history: {
      start: '2018-02-09T17:56:30.176Z',
      moves: [
        { tick: '20', next: 'ii992kl0' },
        { tick: '20', next: 'fkj2ijji' },
        { tick: '333', next: 'wumpus75' },
        { tick: '467', next: 'kii23i34' }
      ]
    },
    sessionHistory: {
      'abcdefgh-1': [
        {
          start: '2018-02-09T17:55:09.176Z',
          moves: [
            { tick: '5703', next: 'ii992kl0' },
            { tick: '37', next: 'fkj2ijji' },
            { tick: '569', next: 'blargy34' }
          ],
          end: '2018-02-09T17:55:25.176Z'
        }
      ]
    },
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
    activeEdition: 'abcdef-1'
  },
}
