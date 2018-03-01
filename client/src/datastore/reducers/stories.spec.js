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

  it('handles LOAD_SUMMARY', () => {
    const summary = summary1
    expect(
      stories(undefined, actions.loadSummary(summary))
    ).toEqual({
      blah: {
        summary
      }
    })
  })

  xit('handles LOAD_SCENE', () => {
    const newState = stories(undefined, actions.loadScene(summary1.storyId, scene1))
    console.log('load scene test', newState)
    expect()
  })

  it('handles LOAD_CATALOG from initial state', () => {
    expect(
      stories(undefined, actions.loadCatalog(summaries))
    ).toEqual({
      'blah': {
        summary: summary1
      },
      'blargy': {
        summary: summary2
      }
    })
  })

  it('handles LOAD_CATALOG from dirty state', () => {
    const dirtyState = {
      'wotcherHarry': {
        summary: {
          storyId: 'wotcherHarry',
          title: 'Tonks and Tanks'
        }
      }
    }
    expect(
      stories(dirtyState, actions.loadCatalog(summaries))
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
