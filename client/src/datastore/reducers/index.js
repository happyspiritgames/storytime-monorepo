import { combineReducers } from 'redux'
import account from './account'
import app from './app'
import codes from './codes'
import drafts from './drafts'
import editions from './editions'
import library from './library'
import player from './player'
import reader from './reader'
import writingDesk from './writingDesk'

const storyTimeApp = combineReducers({
  account,
  app,
  codes,
  drafts,
  editions,
  library,
  player,
  reader,
  writingDesk
})

export default storyTimeApp;
