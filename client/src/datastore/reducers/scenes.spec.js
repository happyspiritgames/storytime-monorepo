import scenesReducer, { initialState } from './scenes'
import * as actions from '../actions'

const scene1 = { sceneId: '1', title: 'Big Things' }
const scene2 = { sceneId: '2', title: 'Little Things' }

describe('scenes reducer', () => {
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
})
