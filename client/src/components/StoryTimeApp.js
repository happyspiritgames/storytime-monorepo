import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Library from './library';
import Reader from './reader';
import WritingDesk from './writingdesk';
import EditStory from './writingdesk/EditStory';
import EditScene from './writingdesk/EditScene';
import Account from './account';
import Admin from './admin';
import About from './about';
import Contact from './contact';
import LoginCallback from './account/LoginCallback';
import './StoryTimeApp.css';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Library} />
        <Route exact path="/reader/:storyId" component={Reader} />
        <Route exact path="/reader/:storyId/:sceneId" component={Reader} />
        <Route exact path="/writingdesk" component={WritingDesk} />
        <Route exact path="/writingdesk/:draftId" component={EditStory} />
        <Route exact path="/writingdesk/:draftId/:sceneId" component={EditScene} />
        <Route path="/account" component={Account} />
        <Route path="/admin" component={Admin} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/callback" component={LoginCallback} />
      </div>
    );
  }
}
