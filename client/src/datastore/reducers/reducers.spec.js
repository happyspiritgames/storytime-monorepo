import reducers from './index'
import { fetchedSummary, fetchedScene } from '../actions'
import { initialState as accountInitState } from './account'
import { initialState as libraryInitState } from './library'
import { initialState as playerInitState } from './player'
import { initialState as readerInitState } from './reader'
import { initialState as storiesInitState } from './stories'

describe('root reducer', () => {
  const initialState = reducers(undefined, {})
  const testSummary = {
    storyId: 'wumpus',
    title: 'The Wumpus'
  }
  const testScene = {
    sceneId: '1',
    title: 'And So It Begins'
  }
  let nextState

  it('produces initial state by default', () => {
    const combinedInitialState = {
      account: accountInitState,
      library: libraryInitState,
      player: playerInitState,
      reader: readerInitState,
      stories: storiesInitState
    }
    expect(initialState).toEqual(combinedInitialState)
  })

  it('stores summary, scene sequence correctly', () => {
    nextState = reducers(undefined, fetchedSummary(testSummary))
    nextState = reducers(nextState, fetchedScene(testSummary.storyId, testScene))
    expect(nextState).toEqual({
      ...initialState,
      stories: {
        'wumpus': {
          summary: testSummary,
          scenes: {
            '1': testScene
          }
        }
      }
    })
  })

  it('stores scene, summary sequence correctly', () => {
    nextState = reducers(undefined, fetchedScene(testSummary.storyId, testScene))
    nextState = reducers(nextState, fetchedSummary(testSummary))
    expect(nextState).toEqual({
      ...initialState,
      stories: {
        'wumpus': {
          summary: testSummary,
          scenes: {
            '1': testScene
          }
        }
      }
    })
  })
})