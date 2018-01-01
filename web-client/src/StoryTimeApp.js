import React from 'react';
import { Route } from 'react-router-dom';
import Library from './components/Library';
import Reader from './components/Reader';
import Settings from './components/Settings';

const StoryTimeApp = () => (
  <div>
    <Route exact path="/" component={Settings} />
    <Route path="/library" component={Library} />
    <Route path="/reader/:storyKey" component={Reader} />
  </div>
);

export default StoryTimeApp;
