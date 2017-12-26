import React from 'react';
import { Route } from 'react-router-dom';
import Library from './components/Library';
import Reader from './components/Reader';

const StoryTimeApp = () => (
  <div>
    <Route path="/library" component={Library} />
    <Route path="/reader/:storyKey" component={Reader} />
  </div>
);

export default StoryTimeApp;
