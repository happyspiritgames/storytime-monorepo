import * as actions from './index';

describe('reader actions', () => {
  it('loadSummary should create LOAD_SUMMARY action', () => {
    expect(
      actions.loadSummary({ storyId: 'blah', title: 'Blargy Blah' })
    ).toEqual({
        type: 'LOAD_SUMMARY',
        summary: { storyId: 'blah', title: 'Blargy Blah' }
    });
  });

  it('loadScene should create LOAD_SCENE action', () => {
    expect(
      actions.loadScene({ sceneId: '37', title: 'Getting Things Done' })
    ).toEqual({
      type: 'LOAD_SCENE',
      scene: { sceneId: '37', title: 'Getting Things Done' }
    });
  });

  it('visitScene should create VISIT_SCENE action', () => {
    expect(
      actions.visitScene('blah')
    ).toEqual({
      type: 'VISIT_SCENE',
      nextSceneId: 'blah'
    });
  });
});
