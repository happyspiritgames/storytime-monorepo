import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './datastore/store'
import ErrorBoundaryContainer from './components/ErrorBoundaryContainer'
import LibraryPage from './components/library'
import ReaderPage from './components/reader'
import LoginCallback from './components/navigation/LoginCallback'
import About from './components/about'
import AccountPage from './components/account'
import Admin from './components/admin'
import Contact from './components/contact'
import Footer from './components/footer'
import Navigation from './components/navigation'
import Publishing from './components/publishing'
import WritingDesk from './components/writingdesk'
// import EditStory from './components/writingdesk/EditStory'
import './StoryTimeApp.css'

export default class StoryTimeApp extends Component {

  render() {
    return (
      <Provider store={store}>
        <ErrorBoundaryContainer>
          <ConnectedRouter history={history}>
            <div className="container-fluid">
              <Navigation />
              <main className="main-content">
                <Switch>
                  <Route exact path="/" component={LibraryPage} />
                  <Route path="/about" component={About} />
                  <Route path="/account" component={AccountPage} />
                  <Route path="/admin" component={Admin} />
                  <Route path="/callback" component={LoginCallback} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/reader/:storyId" component={ReaderPage} />
                  <Route path="/writingdesk" component={WritingDesk} />
                  <Route exact path="/publish/:draftId" component={Publishing} />
                  <Route exact path="/publish/:draftId/:version" component={Publishing} />
                </Switch>
              </main>
              <Footer />
            </div>
          </ConnectedRouter>
        </ErrorBoundaryContainer>
      </Provider>
    )
  }
}
