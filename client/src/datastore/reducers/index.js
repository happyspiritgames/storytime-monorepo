import { combineReducers } from 'redux';
import reader from './reader';

const storyTimeApp = combineReducers({
  reader
});

export default storyTimeApp;

// const dataShape = {
//   library: {
//     featured: 'abc',
//     catalog: 'abd, abe, abf, abg, abh'
//   }
//   reader: {
//     status: readerStates.READY,
//     isFetchingSummary: false,
//     isFetchingScene: false,
//     showErrors: false,
//     errors: [],
//     summary: {},
//     scenes: {
//       '37': {},
//       '42': {},
//       '99': {}
//     },
//     currentSceneId: '42',
//     storyToFetch: 'abc',
//     sceneToFetch: '99',
//     history: ['37', '42']
//   },
//   summaries: {
//     'abc': {},
//     'abd': {},
//     'abe': {},
//     'abf': {},
//     'abg': {},
//     'abh': {}
//   }
// }
