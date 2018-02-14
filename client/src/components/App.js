import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Library from './library';
import Reader from './reader';
import WritingDesk from './writingdesk';
import Account from './account';
import Admin from './admin';
import About from './about';
import Contact from './contact';
import LoginCallback from './account/LoginCallback';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Library} />
        <Route path="/reader/:storyId" component={Reader} />
        <Route path="/reader/:storyId/:sceneId" component={Reader} />
        <Route path="/writingdesk" component={WritingDesk} />
        <Route path="/writingdesk/:draftId" component={WritingDesk} />
        <Route path="/writingdesk/:draftId/:sceneId" component={WritingDesk} />
        <Route path="/account" component={Account} />
        <Route path="/admin" component={Admin} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/callback" component={LoginCallback} />
      </div>
    );
  }
}
