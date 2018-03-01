import library, { initialState, libraryStates } from './library'
import * as actions from '../actions'

const summary1 = { storyId: 'blah', title: 'Alice in Wonderland' }
const summary2 = { storyId: 'blargy', title: 'Beetleguise' }
const summaries = [ summary1, summary2 ]

describe('library reducer', () => {
  it('should provide initial state', () => {
    expect(
      library(undefined, {})
    ).toEqual(initialState)
  })

  it('should handle FETCH_CATALOG', () => {
    expect(
      library(undefined, actions.fetchCatalog())
    ).toEqual({
      ...initialState,
      status: libraryStates.FETCHING
    })
  })

  it('should handle LOAD_CATALOG', () => {
    expect(
      library(undefined, actions.loadCatalog(summaries))
    ).toEqual({
      ...initialState,
      catalog: ['blah', 'blargy']
    })
  })

  it('should handle LOAD_CATALOG with dirty catalog prop', () => {
    const startState = {
      ...initialState,
      catalog: ['arg', 'arf']
    }
    expect(
      library(startState, actions.loadCatalog(summaries))
    ).toEqual({
      ...initialState,
      catalog: ['blah', 'blargy']
    })
  })
})
