import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Library from './Library';
import Reader from './Reader';
import Account from './Account';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Library} />
        <Route path="/library" component={Library} />
        <Route path="/reader/:storyKey" component={Reader} />
        <Route path="/account" component={Account} />
      </div>
    );
  }
}
