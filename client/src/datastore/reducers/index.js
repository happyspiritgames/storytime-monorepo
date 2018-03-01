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
    status: libraryStates.FETCHING,
    featured: 'abc',
    catalog: ['abc', 'abd, abe, abf, abg, abh']
  },
  reader: {
    status: readerStates.READY,
    isFetchingSummary: false,
    isFetchingScene: false,
    showErrors: false,
    errors: [],
    summary: {},
    scenes: {
      '37': {},
      '42': {},
      '99': {}
    },
    currentSceneId: '42',
    storyToFetch: 'abc',
    sceneToFetch: '99',
    history: ['37', '42']
  },
  summaries: {
    'abc': {},
    'abd': {},
    'abe': {},
    'abf': {},
    'abg': {},
    'abh': {}
  }
}
