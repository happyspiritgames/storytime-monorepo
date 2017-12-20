import React from 'react';
import { Link, Route } from 'react-router-dom';
import Library from './components/Library';
import Reader from './components/Reader';

const StoryTimeApp = () => (
  <div>
    <nav>
      <Link to="/library">Library</Link> | <Link to="/reader">Reader</Link>
    </nav>
    <div>
      <Route path="/library" component={Library} />
      <Route path="/reader" component={Reader} />
    </div>
  </div>
);

export default StoryTimeApp;
