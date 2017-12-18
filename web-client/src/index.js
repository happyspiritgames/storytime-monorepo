import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './StoryTimeApp.css';
import StoryTimeApp from './StoryTimeApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<StoryTimeApp />, document.getElementById('root'));
registerServiceWorker();
