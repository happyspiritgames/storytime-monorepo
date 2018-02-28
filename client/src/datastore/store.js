import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'
import { begin, stageSummary, stageScene, beginStory } from './actions'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
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

console.log(store.getState())
// store
//   .dispatch(stageSummary('themission'))
//   .then(() => {
//     const { storyId, firstSceneId } = store.getState().reader.summary
//     store.dispatch(stageScene(storyId, firstSceneId))
//     .then(() => {
//       store.dispatch(beginStory())
//       console.log(store.getState())
//     })
// })

store.dispatch(begin('themission'))

// store
//   .dispatch(begin('themission'))
//   .then(() => {
//     console.log(store.getState())
//   })