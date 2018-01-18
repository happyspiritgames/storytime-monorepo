import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Library from './reader/Library';
import Login from './account/Login';
import Reader from './reader/Reader';
import Account from './account/Account';
import Callback from './Callback';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Library} />
        <Route path="/login" component={Login} />
        <Route path="/library" component={Library} />
        <Route path="/reader/:storyKey" component={Reader} />
        <Route path="/account" component={Account} />
        <Route path="/callback" component={Callback} />
      </div>
    );
  }
}
