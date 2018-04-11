import editionsReducer, { initialState } from './index'
import * as actions from '../../actions'
import { testEditions, testEdition, testEditionScene } from '../../testData'

describe('account reducer', () => {
  let nextState

  it('provides initial state', () => {
    expect(editionsReducer(undefined, {})).toEqual(initialState)
  })

  it('handles FETCHED_EDITIONS', () => {
    nextState = editionsReducer(undefined, actions.fetchedEditions(testEditions))
    expect(nextState).toEqual({
      ...initialState,
      [testEditions[0].editionKey]: testEditions[0]
    })
  })

  it('handles FETCHED_EDITION', () => {
    nextState = editionsReducer(undefined, actions.fetchedEdition(testEdition))
    expect(nextState).toEqual({
      ...initialState,
      [testEdition.editionKey]: testEdition
    })
  })

  it('handles FETCHED_EDITION_SCENE', () => {
    nextState = editionsReducer(undefined, actions.fetchedEdition(testEdition))
    nextState = editionsReducer(nextState,
      actions.fetchedEditionScene(testEdition.editionKey, testEditionScene))
    expect(nextState).toEqual({
      ...initialState,
      [testEdition.editionKey]: {
        ...testEdition,
        scenes: {
          [testEditionScene.sceneId]: testEditionScene
        }
      }
    })
  })
})