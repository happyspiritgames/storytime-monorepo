import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './datastore/store'
import LibraryPage from './components/library'
import ReaderPage from './components/reader'
import LoginCallback from './components/navigation/LoginCallback'
import About from './components/about'
import Account from './components/account'
import Admin from './components/admin'
import Contact from './components/contact'
import Footer from './components/footer'
import Navigation from './components/navigation'
import WritingDesk from './components/writingdesk'
import EditStory from './components/writingdesk/EditStory'
import EditScene from './components/writingdesk/EditScene'
import './StoryTimeApp.css'

export default class StoryTimeApp extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="container-fluid">
            <Navigation />
            <div className="main-content">
              <Switch>
                <Route exact path="/" component={LibraryPage} />
                <Route path="/about" component={About} />
                <Route path="/account" component={Account} />
                <Route path="/admin" component={Admin} />
                <Route path="/callback" component={LoginCallback} />
                <Route path="/contact" component={Contact} />
                <Route path="/reader/:storyId" component={ReaderPage} />
                <Route exact path="/writingdesk" component={WritingDesk} />
                <Route exact path="/writingdesk/:draftId" component={EditStory} />
                <Route path="/writingdesk/:draftId/:sceneId" component={EditScene} />
              </Switch>
            </div>
            <Footer />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}
