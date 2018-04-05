import reducers from './index'
import { fetchedSummary, fetchedScene, updatedProfile } from '../actions'
import { initialState as accountInitState } from './account'
import { initialState as codesInitState } from './codes'
import { initialState as draftsInitState } from './drafts'
import { initialState as libraryInitState } from './library'
import { initialState as playerInitState } from './player'
import { initialState as readerInitState } from './reader'
import { initialState as storiesInitState } from './stories'
import { initialState as writingDeskInitState } from './writingDesk'

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
      codes: codesInitState,
      drafts: draftsInitState,
      library: libraryInitState,
      player: playerInitState,
      reader: readerInitState,
      stories: storiesInitState,
      writingDesk: writingDeskInitState
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

  // try getting this to fail -- for some reason, the state is being hammered when refreshing profile
  it('updating player profile does not clobber state', () => {
    nextState = reducers(undefined, fetchedSummary(testSummary))
    nextState = reducers(nextState, updatedProfile({ id: 'blargy', nickname: 'Bubba' }))
    expect(nextState.stories[testSummary.storyId]).toBeDefined()
  })
})