import reducers from './index'
import { initialState as accountInitState } from './account'
import { initialState as appInitState } from './app'
import { initialState as codesInitState } from './codes'
import { initialState as draftsInitState } from './drafts'
import { initialState as editionsInitState } from './editions'
import { initialState as libraryInitState } from './library'
import { initialState as playerInitState } from './player'
import { initialState as readerInitState } from './reader'
import { initialState as writingDeskInitState } from './writingDesk'

xdescribe('root reducer', () => {
  it('produces initial state by default', () => {
    const initialState = reducers(undefined, {})
    const combinedInitialState = {
      account: accountInitState,
      app: appInitState,
      codes: codesInitState,
      drafts: draftsInitState,
      editions: editionsInitState,
      library: libraryInitState,
      player: playerInitState,
      reader: readerInitState,
      writingDesk: writingDeskInitState
    }
    expect(initialState).toEqual(combinedInitialState)
  })
})