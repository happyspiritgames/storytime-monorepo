import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Clubhouse from './Clubhouse';
import Library from './library';
import Reader from './reader';
import Account from './account';
import LoginCallback from './account/LoginCallback';
import Admin from './admin/PlayerAdmin';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Library} />
        <Route path="/reader/:storyId/:sceneId" component={Reader} />
        <Route path="/account" component={Account} />
        <Route path="/admin" component={Admin} />
        <Route path="/callback" component={LoginCallback} />
      </div>
    );
  }
}
