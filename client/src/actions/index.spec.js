import * as actions from './index'
import { LOAD_SUMMARY, LOAD_SCENE, VISIT_SCENE } from './types'

describe('reader actions', () => {
  it('loadSummary should create LOAD_SUMMARY action', () => {
    expect(
      actions.loadSummary({ storyId: 'blah', title: 'Blargy Blah' })
    ).toEqual({
        type: LOAD_SUMMARY,
        payload: {
          summary: { storyId: 'blah', title: 'Blargy Blah' }
        }
    })
  })

  it('loadScene should create LOAD_SCENE action', () => {
    expect(
      actions.loadScene({ sceneId: '37', title: 'Getting Things Done' })
    ).toEqual({
      type: LOAD_SCENE,
      payload: {
        scene: { sceneId: '37', title: 'Getting Things Done' }
      }
    })
  });

  it('visitScene should create VISIT_SCENE action', () => {
    expect(
      actions.visitScene('blah')
    ).toEqual({
      type: VISIT_SCENE,
      payload: {
        sceneId: 'blah'
      }
    })
  })

  // TODO handle error payloads
})
