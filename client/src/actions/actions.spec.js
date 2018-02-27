import * as actions from './index'

describe('reader actions', () => {
  it('fetchSummary should create FETCH_SUMMARY action', () => {
    expect(
      actions.fetchSummary('blah')
    ).toEqual({
        type: actions.FETCH_SUMMARY,
        payload: {
          storyId: 'blah'
        }
    })
  })

  it('loadSummary should create LOAD_SUMMARY action', () => {
    expect(
      actions.loadSummary({ storyId: 'blah', title: 'Blargy Blah' })
    ).toEqual({
        type: actions.LOAD_SUMMARY,
        payload: {
          summary: { storyId: 'blah', title: 'Blargy Blah' }
        }
    })
  })

  it('fetchScene should create FETCH_SCENE action', () => {
    expect(
      actions.fetchScene('37')
    ).toEqual({
      type: actions.FETCH_SCENE,
      payload: {
        sceneId: '37'
      }
    })
  });

  it('loadScene should create LOAD_SCENE action', () => {
    expect(
      actions.loadScene({ sceneId: '37', title: 'Getting Things Done' })
    ).toEqual({
      type: actions.LOAD_SCENE,
      payload: {
        scene: { sceneId: '37', title: 'Getting Things Done' }
      }
    })
  });

  it('beginStory should create BEGIN_STORY action', () => {
    expect(
      actions.beginStory()
    ).toEqual({
      type: actions.BEGIN_STORY
    })
  })
  
  it('visitScene should create VISIT_SCENE action', () => {
    expect(
      actions.visitScene('blah')
    ).toEqual({
      type: actions.VISIT_SCENE,
      payload: {
        sceneId: 'blah'
      }
    })
  })

  // TODO handle error payloads
})
