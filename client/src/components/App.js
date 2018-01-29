import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Clubhouse from './Clubhouse';
import Library from './reader/Library';
import Login from './account/Login';
import Reader from './reader/Reader';
import Account from './account/Account';
import Admin from './admin/PlayerAdmin';
import Callback from './Callback';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Clubhouse} />
        <Route path="/login" component={Login} />
        <Route path="/library" component={Library} />
        <Route path="/reader/:storyKey" component={Reader} />
        <Route path="/account" component={Account} />
        <Route path="/admin" component={Admin} />
        <Route path="/callback" component={Callback} />
      </div>
    );
  }
}
