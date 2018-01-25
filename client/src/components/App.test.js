import React from 'react';
import ReactDOM from 'react-dom';
import StoryTimeApp from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StoryTimeApp />, div);
});
