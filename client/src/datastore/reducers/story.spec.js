import storyReducer from './story'
import { fetchedSummary, fetchedScene } from '../actions'

describe('story reducer', () => {
  let nextState
  const testSummary = {
    storyId: 'blah',
    title: 'The Big Blah'
  }
  const testScene = { sceneId: '42', title: 'The Big Blah' }
  const scene1 = { sceneId: '1', title: 'Big Things' }
  const scene2 = { sceneId: '2', title: 'Little Things' }

  it('handles FETCHED_SUMMARY', () => {
    nextState = storyReducer(undefined, fetchedSummary(testSummary))
    expect(nextState).toEqual({
      summary: testSummary
    })
  })

  it('handles FETCHED_SCENE', () => {
    nextState = storyReducer(undefined, fetchedScene(testSummary.storyId, testScene))
    expect(nextState).toEqual({
      scenes: {
        [testScene.sceneId] : testScene
      }
    })
  })

  it('handles multiple FETCHED_SCENE', () => {
    nextState = storyReducer(undefined, fetchedScene(testSummary.storyId, scene1))
    nextState = storyReducer(nextState, fetchedScene(testSummary.storyId, scene2))
    expect(nextState).toEqual({
      scenes: {
        [scene1.sceneId]: scene1,
        [scene2.sceneId]: scene2
      }
    })
  })

})