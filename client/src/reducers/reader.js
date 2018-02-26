const reader = (state = {}, action) => {
  let nextState;
  switch (action.type) {
    case 'LOAD_SUMMARY':
      if (!action.summary) {
        console.error('Did not find summary to load');
        nextState = state;
      } else {
        nextState = Object.assign({}, state, { summary: action.summary } );
      }
      return nextState;
    case 'LOAD_SCENE':
      if (!action.scene) {
        console.error('Did not find scene to load');
        nextState = state;
      } else if (!action.scene.sceneId) {
        console.error('The scene must have an ID to store in client state.');
        nextState = state;
      } else {
        const nextScenes = Object.assign({}, state.scenes, { [action.scene.sceneId]: action.scene });
        nextState = Object.assign({}, state, { scenes: nextScenes });
      }
      return nextState;
    case 'VISIT_SCENE':
      if (!action.nextSceneId) {
        console.error('Did not find next scene ID');
        nextState = state;
      } else {
        nextState = Object.assign({}, state, { currentScene: action.nextSceneId });
      }
      return nextState;
    default:
      return state;
  }
}

export default reader;
