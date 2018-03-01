import reader, { initialState, readerStates } from './reader'
import * as actions from '../actions'

describe('reader reducer', () => {
  it('should handle initial state', () => {
    expect(
      reader(undefined, {})
    ).toEqual(initialState)
  })

  it('handles FETCH_SUMMARY', () => {
    expect(
      reader(undefined, actions.fetchSummary('abc'))
    ).toEqual({
      ...initialState,
      storyToFetch: 'abc',
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
      summary: testSummary,
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

  it('handles LOAD_SCENE', () => {
    const testScene = {
      sceneId: '123',
      title: 'Start Here',
      prose: 'Blargy blargy blargy.',
      endPrompt: 'How do you want to get out of this mess?',
      signpost: [
        { sceneId: '124', teaser: 'The easy way.' },
        { sceneId: '125', teaser: 'The hard way.' }
      ]
    }
    expect (
      reader(undefined, actions.loadScene(testScene))
    ).toEqual({
        ...initialState,
        scenes: {
          '123': testScene
        }
    })
  })

  it('handles LOAD_SCENE without scene', () => {
    // TODO use a spy to check console error messages
    expect (
      reader(undefined, actions.loadScene())
    ).toEqual({ ...initialState })
  })

  it('handles LOAD_SCENE without proper payload', () => {
    const garbagePayload = {
      garbage: '123'
    }
    // TODO use a spy to check console error messages
    expect (
      reader(undefined, actions.loadScene(garbagePayload))
    ).toEqual({ ...initialState })
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
