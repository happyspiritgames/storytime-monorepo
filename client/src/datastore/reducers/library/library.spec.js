import library, { initialState, libraryStates } from './index'
import * as actions from '../../actions'
import catalogReducer from './catalog'
import { testEdition, testEditionsForCatalog } from '../../testData'

describe('library reducer', () => {
  it('provides initial state', () => {
    expect(library(undefined, {})).toEqual(initialState)
  })

  it('handles LIBRARY_FETCHING', () => {
    expect(library(undefined, actions.libraryFetching())).toEqual({
      ...initialState,
      status: libraryStates.FETCHING
    })
  })

  it('handles LIBRARY_READY', () => {
    expect(library(undefined, actions.libraryReady())).toEqual({
      ...initialState,
      status: libraryStates.READY
    })
  })

  it('handles FETCHED_EDITION', () => {
    const testAction = actions.fetchedEdition(testEdition)
    const resultFromCatalogReducer = catalogReducer(undefined, testAction)
    expect(library(undefined, testAction)).toEqual({
      ...initialState,
      status: libraryStates.READY,
      catalog: resultFromCatalogReducer,
      isLoaded: true
    })
  })

  it('handles FETCHED_EDITIONS', () => {
    const testAction = actions.fetchedEditions(testEditionsForCatalog)
    const resultFromCatalogReducer = catalogReducer(undefined, testAction)
    expect(library(undefined, testAction)).toEqual({
      ...initialState,
      status: libraryStates.READY,
      catalog: resultFromCatalogReducer,
      isLoaded: true
    })
  })
})
