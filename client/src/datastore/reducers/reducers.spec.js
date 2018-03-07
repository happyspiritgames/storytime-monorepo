import reducers from './index'
import { fetchedSummary, fetchedScene } from '../actions'
import { initialState as libraryInitState } from './library'
import { initialState as readerInitState } from './reader'
import { initialState as accountInitState } from './account'

describe('root reducer', () => {
  const testSummary = {
    storyId: 'wumpus',
    title: 'The Wumpus'
  }
  const testScene = {
    sceneId: '1',
    title: 'And So It Begins'
  }
  let nextState

  const initialState = {
    library: libraryInitState,
    reader: readerInitState,
    account: accountInitState
  }

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