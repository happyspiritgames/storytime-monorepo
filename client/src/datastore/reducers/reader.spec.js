import reader, { initialState, readerStates } from './reader'
import * as actions from '../actions'

describe('reader reducer', () => {
  it('should provide initial state', () => {
    expect(
      reader(undefined, {})
    ).toEqual(initialState)
  })

  it('handles FETCH_SUMMARY', () => {
    expect(
      reader(undefined, actions.fetchSummary('abc'))
    ).toEqual({
      ...initialState,
      status: readerStates.FETCHING
    })
  })

  it('handles LOAD_SUMMARY', () => {
    const testSummary = {
      storyId: 'ABCDEFG',
      title: 'Winner',
      penName: 'Onthe Money',
      tagLine: 'A tale of winning beyond belief',
      about: 'You think winning is easy?  Well why not?!'
    }
    expect(
      reader(undefined, actions.loadSummary(testSummary))
    ).toEqual({
      ...initialState,
      storyId: testSummary,
      status: readerStates.NOT_READY
    })
  })

  it('handles LOAD_SUMMARY without payload', () => {
    // TODO use a spy to check console error messages
    expect(
      reader(undefined, actions.loadSummary())
    ).toEqual({
      ...initialState,
      status: readerStates.NOT_READY
    })
  })

  it('handles FETCH_SCENE', () => {
    expect(
      reader(undefined, actions.fetchScene('42'))
    ).toEqual({
      ...initialState,
      sceneToFetch: '42',
      status: readerStates.FETCHING
    })
  })

  it('handles START_STORY when summary and scene are loaded', () => {
    const testState = {
      summary: {
        storyId: 'ABCDEFG',
        title: 'Winner',
        penName: 'Onthe Money',
        tagLine: 'A tale of winning beyond belief',
        about: 'You think winning is easy?  Well why not?!',
        firstSceneId: '42'
      },
      scenes: {
        '42': {}
      },
      state: readerStates.NOT_READY
    }
    const result = reader(testState, actions.beginStory())
    expect(result.currentSceneId).toEqual('42')
    expect(result.status).toEqual(readerStates.READY)
    expect(result.history).toEqual(['42'])
  })

  it('handles VISIT_SCENE', () => {
    expect (
      reader(undefined, actions.visitScene('42'))
    ).toEqual({
      ...initialState,
      currentSceneId: '42',
      history: ['42'],
      status: readerStates.READY
    })
  })

  it('handles VISIT_SCENE without sceneId', () => {
    // TODO use a spy to check console error messages
    expect (
      reader(undefined, actions.visitScene())
    ).toEqual({
      ...initialState
    })
  })
})
