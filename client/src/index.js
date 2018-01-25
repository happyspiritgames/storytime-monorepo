import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import './components/App.css';
import StoryTimeApp from './components/App';

ReactDOM.render((
  <BrowserRouter>
    <StoryTimeApp />
  </BrowserRouter>
), document.getElementById('root'));
