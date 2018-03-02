import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

export const history = createHistory()

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
  logger
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtention = window.devToolsExtention

  if (typeof devToolsExtention === 'function') {
    enhancers.push(devToolsExtention())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
