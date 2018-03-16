import scenesReducer, { initialState } from './scenes'
import * as actions from '../actions'
import { testDraftScene, testSignpost } from '../testData'

const scene1 = { sceneId: '1', title: 'Big Things' }
const scene2 = { sceneId: '2', title: 'Little Things' }

describe('scenes reducer', () => {
  let nextState

  it('should provide initial state', () => {
    expect(scenesReducer(undefined, {})).toEqual(initialState)
  })

  it('handles FETCHED_SCENE with default state', () => {
    expect(scenesReducer(undefined, actions.fetchedScene('bah', scene1)))
      .toEqual({
        [scene1.sceneId]: scene1
      })
  })

  it('handles FETCHED_SCENE with existing state', () => {
    expect(scenesReducer({ [scene2.sceneId]: scene2 }, actions.fetchedScene('bah', scene1)))
      .toEqual({
        [scene2.sceneId]: scene2,
        [scene1.sceneId]: scene1
      })
  })

  it('handles LOADED_DRAFT', () => {
    expect(scenesReducer(undefined, actions.loadedDraft({
      summary: {},
      scenes: [scene1, scene2]
    })))
    .toEqual({
      [scene1.sceneId]: scene1,
      [scene2.sceneId]: scene2
    })
  })

  it('handles LOADED_DRAFT_SCENE', () => {
    nextState = scenesReducer(undefined, actions.loadedDraftScene('myStory', testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: testDraftScene
    })
  })

  it('handles SAVED_DRAFT_SCENE', () => {
    nextState = scenesReducer(undefined, actions.savedDraftScene('myStory', testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: testDraftScene
    })
  })

  it('handles LOADED_DRAFT_SIGNPOST', () => {
    nextState = scenesReducer(undefined, actions.loadedDraftScene('myStory', testDraftScene))
    nextState = scenesReducer(nextState,
      actions.loadedDraftSignpost('myStory', testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: {
        ...testDraftScene,
        signpost: testSignpost
      }
    })
  })

  it('handles SAVED_DRAFT_SIGNPOST', () => {
    nextState = scenesReducer(undefined, actions.loadedDraftScene('myStory', testDraftScene))
    nextState = scenesReducer(nextState,
      actions.savedDraftSignpost('myStory', testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: {
        ...testDraftScene,
        signpost: testSignpost
      }
    })
  })
})
