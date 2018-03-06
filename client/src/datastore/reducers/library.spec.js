import library, { initialState, libraryStates } from './library'
import * as actions from '../actions'

describe('library reducer', () => {
  const summaries = [
    { storyId: 'blah', title: 'Alice in Wonderland' },
    { storyId: 'blargy', title: 'Beetleguise' }
  ]

  it('provides initial state', () => {
    expect(
      library(undefined, {})
    ).toEqual(initialState)
  })

  it('handles LIBRARY_FETCHING', () => {
    expect(
      library(undefined, actions.libraryFetching())
    ).toEqual({
      ...initialState,
      status: libraryStates.FETCHING
    })
  })

  it('handles LIBRARY_READY', () => {
    expect(
      library(undefined, actions.libraryReady())
    ).toEqual({
      ...initialState,
      status: libraryStates.READY
    })
  })

  it('handles FETCHED_CATALOG', () => {
    expect(
      library(undefined, actions.fetchedCatalog(summaries))
    ).toEqual({
      ...initialState,
      catalog: ['blah', 'blargy']
    })
  })

  it('handles FETCHED_CATALOG with dirty catalog prop', () => {
    const startState = {
      ...initialState,
      catalog: ['arg', 'arf']
    }
    expect(
      library(startState, actions.fetchedCatalog(summaries))
    ).toEqual({
      ...initialState,
      catalog: ['blah', 'blargy']
    })
  })
})
