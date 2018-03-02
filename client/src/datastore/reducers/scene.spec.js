import scene, { initialState } from './scene'
import * as actions from '../actions'

const scene1 = { sceneId: '1', title: 'Big Things' }
const scene2 = { sceneId: '2', title: 'Little Things' }

describe('scene reducer', () => {
  it('should provide initial state', () => {
    expect(scene(undefined, {})).toEqual(initialState)
  })

  it('handles FETCHED_SCENE with default state', () => {
    expect(scene(undefined, actions.fetchedScene('bah', scene1)))
      .toEqual({
        [scene1.sceneId]: scene1
      })
  })

  it('handles FETCHED_SCENE with existing state', () => {
    expect(scene({ [scene2.sceneId]: scene2 }, actions.fetchedScene('bah', scene1)))
      .toEqual({
        [scene2.sceneId]: scene2,
        [scene1.sceneId]: scene1
      })
  })
})
