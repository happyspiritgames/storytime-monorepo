import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Clubhouse from './Clubhouse';
import Library from './library';
import Reader from './reader';
import Login from './account/Login';
import Account from './account/Account';
import Admin from './admin/PlayerAdmin';
import Callback from './Callback';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Library} />
        <Route path="/reader/:storyId/:sceneId" component={Reader} />
      </div>
    );
  }
}

/*
        <Route path="/login" component={Login} />
        <Route path="/library" component={Library} />
        <Route path="/account" component={Account} />
        <Route path="/admin" component={Admin} />
        <Route path="/callback" component={Callback} />
*/