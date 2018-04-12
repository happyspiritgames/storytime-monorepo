import catalogReducer, { initialState } from './catalog'
import * as actions from '../../actions'
import {
  testEditionsForCatalog,
  testEditionVariant1,
  testEditionVariant2NoRatingNoGenre
} from '../../testData'

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