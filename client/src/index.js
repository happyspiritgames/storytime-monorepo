import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './datastore/store'
import StoryTimeApp from './StoryTimeApp'
import './index.css'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <StoryTimeApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
