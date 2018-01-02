import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './components/StoryTimeApp.css';
import StoryTimeApp from './components/StoryTimeApp';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <StoryTimeApp />
  </BrowserRouter>
), document.getElementById('root'));

// registerServiceWorker();
