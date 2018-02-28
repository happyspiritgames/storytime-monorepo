import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StoryTimeApp from './StoryTimeApp';

// TODO get some tests working
xit('renders without crashing', () => {
  const div = document.createElement('div');
  const app = (
    <BrowserRouter>
      <StoryTimeApp />
    </BrowserRouter>
  );
  ReactDOM.render(app, div);
});
