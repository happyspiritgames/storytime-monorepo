import React from 'react';
import { Route } from 'react-router-dom';
import Library from './Library';
import Reader from './Reader';
import Settings from './Account';

const StoryTimeApp = () => (
  <div>
    <Route exact path="/" component={Library} />
    <Route path="/library" component={Library} />
    <Route path="/reader/:storyKey" component={Reader} />
    <Route path="/membership" component={Settings} />
  </div>
);

export default StoryTimeApp;
