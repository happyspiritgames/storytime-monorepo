import scenesReducer, { initialState } from './scenes'
import * as actions from '../../actions'
import { testDraftScene, testSignpost } from '../../testData'

const scene1 = { sceneId: '1', title: 'Big Things' }
const scene2 = { sceneId: '2', title: 'Little Things' }

describe('scenes reducer', () => {
  let nextState

  it('should provide initial state', () => {
    expect(scenesReducer(undefined, {})).toEqual(initialState)
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
    nextState = scenesReducer(undefined, actions.loadedDraftScene(testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: testDraftScene
    })
  })

  it('handles SAVED_DRAFT_SCENE', () => {
    nextState = scenesReducer(undefined, actions.savedDraftScene(testDraftScene))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: testDraftScene
    })
  })

  it('handles LOADED_DRAFT_SIGNPOST', () => {
    nextState = scenesReducer(undefined, actions.loadedDraftScene(testDraftScene))
    nextState = scenesReducer(nextState,
      actions.loadedDraftSignpost(testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: {
        ...testDraftScene,
        signpost: testSignpost
      }
    })
  })

  it('handles SAVED_DRAFT_SIGNPOST', () => {
    nextState = scenesReducer(undefined, actions.loadedDraftScene(testDraftScene))
    nextState = scenesReducer(nextState,
      actions.savedDraftSignpost(testDraftScene.sceneId, testSignpost))
    expect(nextState).toEqual({
      ...initialState,
      [testDraftScene.sceneId]: {
        ...testDraftScene,
        signpost: testSignpost
      }
    })
  })
})
