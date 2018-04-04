import { combineReducers } from 'redux'
import account from './account'
import codes from './codes'
import drafts from './drafts'
import library from './library'
import player from './player'
import reader from './reader'
import stories from './stories'
import writingDesk from './writingDesk'

const storyTimeApp = combineReducers({
  account,
  codes,
  drafts,
  library,
  player,
  reader,
  stories,
  writingDesk
})

export default storyTimeApp;
