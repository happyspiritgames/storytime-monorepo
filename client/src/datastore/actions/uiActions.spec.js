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

  it('creates READER_FETCHING action', () => {
    expect(
      actions.readerFetching()
    ).toEqual({
      type: actions.READER_FETCHING
    })
  })

  it('creates READER_READY action', () => {
    expect(
      actions.readerReady()
    ).toEqual({
      type: actions.READER_READY
    })
  })

  it('creates BEGIN_STORY action', () => {
    expect(
      actions.beginStory('blah')
    ).toEqual({
      type: actions.BEGIN_STORY,
      payload: {
        storyId: 'blah'
      }
    })
  })

  it('creates VISIT_SCENE action', () => {
    expect(
      actions.visitScene('blah')
    ).toEqual({
      type: actions.VISIT_SCENE,
      payload: {
        sceneId: 'blah'
      }
    })
  })

})