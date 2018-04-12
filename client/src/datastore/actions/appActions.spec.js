import * as actions from './index'

describe('ui actions', () => {
  it('creates LIBRARY_FETCHING action', () => {
    expect(
      actions.libraryFetching()
    ).toEqual({
      type: actions.LIBRARY_FETCHING
    })
  })

  it('creates LIBRARY_READY action', () => {
    expect(
      actions.libraryReady()
    ).toEqual({
      type: actions.LIBRARY_READY
    })
  })
})