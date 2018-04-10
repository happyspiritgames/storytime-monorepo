import * as actions from './index'
import { testEdition, testEditions, testEditionScene, testError } from '../testData'

describe('edition actions', () => {
  it('creates FETCH_EDITIONS action', () => {
    expect(actions.fetchEditions()).toEqual({
      type: actions.FETCH_EDITIONS
    })
  })

  it('creates FETCHED_EDITIONS action', () => {
    expect(actions.fetchedEditions(testEditions)).toEqual({
      type: actions.FETCHED_EDITIONS,
      payload: {
        editions: testEditions
      }
    })
  })

  it('creates FETCH_EDITIONS_FAILED action', () => {
    expect(actions.fetchEditionsFailed(testError)).toEqual({
      type: actions.FETCH_EDITIONS_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates FETCH_EDITION action', () => {
    expect(actions.fetchEdition()).toEqual({
      type: actions.FETCH_EDITION
    })
  })

  it('creates FETCHED_EDITION action', () => {
    expect(actions.fetchedEdition(testEdition)).toEqual({
      type: actions.FETCHED_EDITION,
      payload: {
        edition: testEdition
      }
    })
  })

  it('creates FETCH_EDITION_FAILED action', () => {
    expect(actions.fetchEditionFailed(testError, 'blah')).toEqual({
      type: actions.FETCH_EDITION_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('creates FETCH_EDITION_SCENE action', () => {
    expect(actions.fetchEditionScene()).toEqual({
      type: actions.FETCH_EDITION_SCENE
    })
  });

  it('loadScene should create FETCHED_EDITION_SCENE action', () => {
    expect(actions.fetchedEditionScene('blah-1', testEditionScene)).toEqual({
      type: actions.FETCHED_EDITION_SCENE,
      payload: {
        editionKey: 'blah-1',
        scene: testEditionScene
      }
    })
  });

  it('creates FETCH_SCENE_FAILED action', () => {
    expect(actions.fetchEditionSceneFailed(testError)).toEqual({
      type: actions.FETCH_EDITION_SCENE_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })
})
