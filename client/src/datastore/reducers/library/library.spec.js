import library, { initialState, libraryStates } from './index'
import * as actions from '../../actions'

describe('library reducer', () => {
  it('provides initial state', () => {
    expect(library(undefined, {})).toEqual(initialState)
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
})
