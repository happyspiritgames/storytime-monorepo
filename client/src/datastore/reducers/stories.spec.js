import stories, { initialState } from './stories'
import * as actions from '../actions'

// test data
const summary1 = { storyId: 'blah', title: 'Alice in Wonderland' }
const summary2 = { storyId: 'blargy', title: 'Beetleguise' }
const summaries = [ summary1, summary2 ]
const scene1 = { sceneId: '1', title: 'Big Things' }
const scene2 = { sceneId: '2', title: 'Little Things' }

describe('stories reducer', () => {
  it('should provide initial state', () => {
    expect(
      stories(undefined, {})
    ).toEqual(initialState)
  })

  it('handles FETCHED_SUMMARY', () => {
    let newState = stories(undefined, actions.fetchedSummary(summary1))
    expect(newState).toEqual({
      [summary1.storyId]: {
        summary: summary1
      }
    })
  })

  it('handles multiple calls to FETCHED_SUMMARY', () => {
    let newState = stories(undefined, actions.fetchedSummary(summary1))
    expect(newState).toEqual({
      [summary1.storyId]: {
        summary: summary1
      }
    })
    newState = stories(newState, actions.fetchedSummary(summary2))
    expect(newState).toEqual({
      [summary1.storyId]: {
        summary: summary1
      },
      [summary2.storyId]: {
        summary: summary2
      }
    })
  })

  it('handles FETCHED_SCENE', () => {
    let newState = stories(undefined, actions.fetchedScene(summary1.storyId, scene1))
    expect(newState).toEqual({
      [summary1.storyId]: {
        scenes: {
          [scene1.sceneId]: scene1
        }
      }
    })
  })

  it('handles multiple calls to FETCHED_SCENE', () => {
    let newState = stories(undefined, actions.fetchedScene(summary1.storyId, scene1))
    expect(newState).toEqual({
      [summary1.storyId]: {
        scenes: {
          [scene1.sceneId]: scene1
        }
      }
    })
    newState = stories(newState, actions.fetchedScene(summary1.storyId, scene2))
    expect(newState).toEqual({
      [summary1.storyId]: {
        scenes: {
          [scene1.sceneId]: scene1,
          [scene2.sceneId]: scene2
        }
      }
    })
  })

  it('handles FETCHED_CATALOG from initial state', () => {
    expect(
      stories(undefined, actions.fetchedCatalog(summaries))
    ).toEqual({
      'blah': {
        summary: summary1
      },
      'blargy': {
        summary: summary2
      }
    })
  })

  it('handles FETCHED_CATALOG from dirty state', () => {
    const dirtyState = {
      'wotcherHarry': {
        summary: {
          storyId: 'wotcherHarry',
          title: 'Tonks and Tanks'
        }
      }
    }
    expect(
      stories(dirtyState, actions.fetchedCatalog(summaries))
    ).toEqual({
      'blah': {
        summary: summary1
      },
      'blargy': {
        summary: summary2
      }
    })
  })
})
