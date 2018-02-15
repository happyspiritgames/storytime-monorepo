import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StoryTimeApp from './components/StoryTimeApp';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <StoryTimeApp />
  </BrowserRouter>
), document.getElementById('root'));
