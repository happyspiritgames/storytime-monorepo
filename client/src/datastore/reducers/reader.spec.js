import reader, { initialState, readerStates } from './reader'
import * as actions from '../actions'

describe('reader reducer', () => {
  let nextState

  it('should provide initial state', () => {
    expect(reader(undefined, {})).toEqual(initialState)
  })

  it('handles READER_FETCHING', () => {
    expect(reader(undefined, actions.readerFetching()))
    .toEqual({
      ...initialState,
      status: readerStates.FETCHING
    })
  })

  it('handles READER_READY', () => {
    nextState = reader(undefined, actions.readerFetching())
    expect(reader(nextState, actions.readerReady()))
    .toEqual({
      ...initialState,
      status: readerStates.READY
    })
  })

  it('handles READER_NOT_READY', () => {
    nextState = reader(undefined, actions.readerReady())
    expect(reader(nextState, actions.readerNotReady()))
    .toEqual({
      ...initialState,
      status: readerStates.NOT_READY
    })
  })

  it('handles BEGIN_STORY', () => {
    expect(reader(undefined, actions.beginStory('abc-1', 'alpha')))
    .toEqual({
      ...initialState,
      activeEdition: 'abc-1',
      activeScene: 'alpha'
    })
  })

  xit('handles BEGIN_STORY with history', () => {
    let startTime = Date.now()
    expect(reader(undefined, actions.beginStory('abc-1', 'alpha', startTime)))
    .toEqual({
      ...initialState,
      activeEdition: 'abc-1',
      activeScene: 'alpha',
      history: {
        start: startTime,
        moves: [
          { tick: 0, next: 'alpha' }
        ]
      }
    })
  })

  it('handles VISIT_SCENE', () => {
    let nextState = reader(undefined, actions.beginStory('abc-1', 'alpha'))
    expect (reader(nextState, actions.visitScene('beta')))
    .toEqual({
      ...initialState,
      activeEdition: 'abc-1',
      activeScene: 'beta'
    })
  })

  xit('handles VISIT_SCENE with history', () => {
    let timestamp = Date.now()
    let nextState = reader(undefined, actions.beginStory('abc-1', 'alpha', timestamp-30))
    expect (
      reader(nextState, actions.visitScene('beta', timestamp))
    ).toEqual({
      ...initialState,
      activeEdition: 'abc-1',
      activeScene: 'beta',
      history: {
        start: timestamp-30,
        moves: [
          { tick: 0, next: 'alpha' },
          { tick: 30, next: 'beta' },
        ]
      }
    })
  })
})
