import { combineReducers } from 'redux'
import library from './library'
import reader from './reader'
import stories from './stories'

const storyTimeApp = combineReducers({
  library,
  reader,
  stories
})

export default storyTimeApp;

// sample for reference
// const dataShape = {
//   library: {
//     status: libraryStates.FETCHING,  // READY, FETCHING
//     catalog: ['abc', 'abd', 'abe', 'abf', 'abg', 'abh'],
//     featured: {
//       storyId: 'abc',
//       specialMessage: 'On sale this month'
//     }
//   },
//   reader: {
//     status: readerStates.READY,  // READY, FETCHING
//     storyId: 'abc',
//     sceneId: '42',
//     history: ['37', '42'],
//     errors: [],
//     showErrors: false  // hides error messages from player
//   },
//   stories: {
//     'abc': {
//       summary: {
//       },
//       scenes: {
//         '37': {},
//         '42': {},
//         '99': {}
//       }
//     },
//     'abd': {},
//     'abe': {},
//     'abf': {},
//     'abg': {},
//     'abh': {}
//   }
// }
