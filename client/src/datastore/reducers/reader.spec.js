import reader, { initialState, readerStates } from './reader'
import * as actions from '../actions'

describe('reader reducer', () => {
  it('should provide initial state', () => {
    expect(
      reader(undefined, {})
    ).toEqual(initialState)
  })

  it('handles READER_FETCHING', () => {
    expect(
      reader(undefined, actions.readerFetching())
    ).toEqual({
      ...initialState,
      status: readerStates.FETCHING
    })
  })

  it('handles READER_READY', () => {
    expect(
      reader(undefined, actions.readerReady())
    ).toEqual({
      ...initialState,
      status: readerStates.READY
    })
  })

  it('handles BEGIN_STORY', () => {
    expect(
      reader(undefined, actions.beginStory('abc', '1'))
    ).toEqual({
      ...initialState,
      storyId: 'abc',
      sceneId: '1',
      history: [ '1' ]
    })
  })

  it('handles VISIT_SCENE', () => {
    expect (
      reader(undefined, actions.visitScene('42'))
    ).toEqual({
      ...initialState,
      sceneId: '42',
      history: ['42']
    })
  })

  it('handles VISIT_SCENE without sceneId', () => {
    // TODO use a spy to check console error messages
    expect (
      reader(undefined, actions.visitScene())
    ).toEqual(initialState)
  })
})
