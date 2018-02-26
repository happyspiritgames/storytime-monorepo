export const loadSummary = (summary) => ({
  type: 'LOAD_SUMMARY',
  summary: summary
});

export const loadScene = (scene) => ({
  type: 'LOAD_SCENE',
  scene: scene
});

export const visitScene = (sceneId) => ({
  type: 'VISIT_SCENE',
  nextSceneId: sceneId
});
