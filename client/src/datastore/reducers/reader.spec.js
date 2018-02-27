import reader, { initialState, readerStatus } from './reader'
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
      status: readerStatus.FETCHING
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
      reader(
        undefined, actions.loadSummary(testSummary))
      ).toEqual({
        ...initialState,
        summary: testSummary,
        status: readerStatus.READY
      }
    )
  })

  it('handles LOAD_SUMMARY without payload', () => {
    // TODO use a spy to check console error messages
    expect(
      reader({}, {
        type: 'LOAD_SUMMARY',
        blargy: {
          storyId: 'ABCDEFG',
          title: 'Loser'
        }
      })
    ).toEqual({})
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
      reader({}, {
        type: 'LOAD_SCENE',
        scene: testScene
      })
    ).toEqual({
      scenes: {
        '123': testScene
      }
    })
  })

  it('handles LOAD_SCENE without scene', () => {
    // TODO use a spy to check console error messages
    expect (
      reader({}, {
        type: 'LOAD_SCENE',
        wrongScene: {}
      })
    ).toEqual({});
  })

  it('handles LOAD_SCENE without proper payload', () => {
    const garbagePayload = {
      garbage: '123'
    }
    // TODO use a spy to check console error messages
    expect (
      reader({}, {
        type: 'LOAD_SCENE',
        scene: garbagePayload
      })
    ).toEqual({})
  })

  it('handles VISIT_SCENE', () => {
    expect (
      reader({}, {
        type: 'VISIT_SCENE',
        nextSceneId: '42'
      })
    ).toEqual({
      currentScene: '42'
    })
  })
  it('handles VISIT_SCENE without sceneId', () => {
    expect (
      reader({}, {
        type: 'VISIT_SCENE',
        sceneId: '42'
      })
    ).toEqual({})
  })
})
