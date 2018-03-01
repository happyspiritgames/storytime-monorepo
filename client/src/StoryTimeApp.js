import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LibraryPage from './containers/LibraryPage';
import ReaderPage from './containers/ReaderPage';
import WritingDesk from './components/writingdesk';
import EditStory from './components/writingdesk/EditStory';
import EditScene from './components/writingdesk/EditScene';
import Account from './components/account';
import Admin from './components/admin';
import About from './components/about';
import Contact from './components/contact';
import LoginCallback from './components/navigation/LoginCallback';
import './StoryTimeApp.css';

export default class StoryTimeApp extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={LibraryPage} />
        <Route path="/reader/:storyId" component={ReaderPage} />
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
