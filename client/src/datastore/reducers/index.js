import { combineReducers } from 'redux';
import reader, { readerStates } from './reader';
import library, { libraryStates } from './library';
import summaries from './summaries'

const storyTimeApp = combineReducers({
  library,
  reader,
  summaries
});

export default storyTimeApp;

// sample for reference
const dataShape = {
  library: {
    status: libraryStates.FETCHING,  // READY, FETCHING
    featured: {
      storyId: 'abc',
      specialMessage: 'On sale this month'
    },
    catalog: ['abc', 'abd', 'abe', 'abf', 'abg', 'abh']
  },
  reader: {
    status: readerStates.READY,  // READY, FETCHING
    storyId: 'abc',
    sceneId: '42',
    history: ['37', '42'],
    errors: [],
    showErrors: false  // hides error messages from player
  },
  stories: {
    'abc': {
      summary: {
      },
      scenes: {
        '37': {},
        '42': {},
        '99': {}
      }
    },
    'abd': {},
    'abe': {},
    'abf': {},
    'abg': {},
    'abh': {}
  }
}
