import catalogReducer, { initialState } from './catalog'
import * as actions from '../../actions'

export const testEditionsForCatalog = [
  {
    editionKey: 'aaaaaaaa-1',
    storyId: 'aaaaaaaa',
    version: '1',
    status: 'available',
    summary: {
      title: 'Ramona\'s Big Adventure',
      penName: 'Bubba',
      tagLine: 'Blargy blargy.',
      about: 'An adventure to watch with your parents.',
      firstSceneId: 'a1111111'
    },
    rating: 'PG',
    genre: ['adventure'],
    publishedAt: '2018-01-26T00:02:21.635Z'
  }, {
    editionKey: 'bbbbbbbb-1',
    storyId: 'bbbbbbbb',
    version: '1',
    status: 'available',
    summary: {
      title: 'The Portal to Mars',
      penName: 'Bubba',
      tagLine: 'Blargy blargy.',
      about: 'A sci-fi, adventure, fantasy to watch with your parents.',
      firstSceneId: 'b1111111'
    },
    rating: 'PG',
    genre: ['scifi', 'adventure', 'fantasy'],
    publishedAt: '2018-01-26T00:02:21.635Z'
  }, {
    editionKey: 'cccccccc-3',
    storyId: 'cccccccc',
    version: '3',
    status: 'available',
    summary: {
      title: 'The Hijinx of Mystery Man',
      penName: 'Bubba',
      tagLine: 'Blargy blargy.',
      about: 'A mystery for mature audiences.',
      firstSceneId: 'c3333333'
    },
    rating: 'MA',
    genre: ['mystery'],
    publishedAt: '2018-01-26T00:02:21.635Z'
  }
]

const testEditionVariant1 = {
  editionKey: 'dddddddd-13',
  storyId: 'dddddddd',
  version: '13',
  status: 'available',
  summary: {
    title: 'A Walk Through History',
    penName: 'Bubba',
    tagLine: 'Blargy blargy.',
    about: 'An historical tale for all.',
    firstSceneId: 'd1313131'
  },
  rating: 'G',
  genre: ['historical'],
  publishedAt: '2018-01-26T00:02:21.635Z'
}

const testEditionVariant2NoRatingNoGenre = {
  editionKey: 'eeeeeeee-14',
  storyId: 'eeeeeeee',
  version: '13',
  status: 'available',
  summary: {
    title: 'Unknown Country',
    penName: 'Bubba',
    tagLine: 'Blargy blargy.',
    about: 'Who knows what this is about or who it\'s for?',
    firstSceneId: 'e1414141'
  },
  publishedAt: '2018-01-26T00:02:21.635Z'
}

describe('catalog reducer', () => {
  let nextState

  it('has an initial state', () => {
    expect(catalogReducer(undefined, {})).toEqual(initialState)
  })

  it('handles FETCHED_EDITION', () => {
    nextState = catalogReducer(undefined, actions.fetchedEdition(testEditionsForCatalog[0]))
    expect(nextState).toEqual({
      editions: ['aaaaaaaa-1'],
      byRating: {
        'PG': ['aaaaaaaa-1']
      },
      byGenre: {
        'adventure': ['aaaaaaaa-1']
      }
    })
  })

  it('handles FETCHED_EDITION more than once without clobbering previous state', () => {
    nextState = catalogReducer(undefined, actions.fetchedEdition(testEditionsForCatalog[0]))
    nextState = catalogReducer(nextState, actions.fetchedEdition(testEditionVariant1))
    expect(nextState).toEqual({
      editions: ['aaaaaaaa-1', 'dddddddd-13'],
      byRating: {
        'PG': ['aaaaaaaa-1'],
        'G': ['dddddddd-13']
      },
      byGenre: {
        'adventure': ['aaaaaaaa-1'],
        'historical': ['dddddddd-13']
      }
    })
  })

  it('handles FETCHED_EDITION works without rating or genre', () => {
    nextState = catalogReducer(undefined, actions.fetchedEdition(testEditionVariant2NoRatingNoGenre))
    expect(nextState).toEqual({
      editions: ['eeeeeeee-14'],
      byRating: {
        'unrated': ['eeeeeeee-14']
      },
      byGenre: {
        'unclassified': ['eeeeeeee-14']
      }
    })
  })

  it('handles FETCHED_EDITIONS', () => {
    nextState = catalogReducer(undefined, actions.fetchedEditions(testEditionsForCatalog))
    expect(nextState).toEqual({
      editions: ['aaaaaaaa-1', 'bbbbbbbb-1', 'cccccccc-3'],
      byRating: {
        'PG': ['aaaaaaaa-1', 'bbbbbbbb-1'],
        'MA': ['cccccccc-3']
      },
      byGenre: {
        'adventure': ['aaaaaaaa-1', 'bbbbbbbb-1'],
        'scifi': ['bbbbbbbb-1'],
        'fantasy': ['bbbbbbbb-1'],
        'mystery': ['cccccccc-3']
      }
    })
  })
})