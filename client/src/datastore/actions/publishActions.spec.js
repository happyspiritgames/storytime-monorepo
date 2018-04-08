import * as actions from './index'
import {
  testError,
  testEdition
} from '../testData'

describe('writing desk actions', () => {
  it('should create START_TO_PUBLISH action', () => {
    expect(actions.startToPublish())
    .toEqual({
      type: actions.START_TO_PUBLISH
    })
  })

  it('should create STARTED_TO_PUBLISH action', () => {
    expect(actions.startedToPublish(testEdition))
    .toEqual({
      type: actions.STARTED_TO_PUBLISH,
      payload: {
        edition: testEdition
      }
    })
  })

  it('should create START_TO_PUBLISH_FAILED action', () => {
    expect(actions.startToPublishFailed(testError))
    .toEqual({
      type: actions.START_TO_PUBLISH_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('should create FETCH_EDITIONS action', () => {
    expect(actions.fetchEditions())
    .toEqual({
      type: actions.FETCH_EDITIONS
    })
  })

  it('should create FETCHED_EDITIONS action', () => {
    expect(actions.fetchedEditions([testEdition]))
    .toEqual({
      type: actions.FETCHED_EDITIONS,
      payload: {
        editions: [testEdition]
      }
    })
  })

  it('should create FETCH_EDITIONS_FAILED action', () => {
    expect(actions.fetchEditionsFailed(testError))
    .toEqual({
      type: actions.FETCH_EDITIONS_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('should create FETCH_EDITION action', () => {
    expect(actions.fetchEdition())
    .toEqual({
      type: actions.FETCH_EDITION
    })
  })

  it('should create FETCHED_EDITION action', () => {
    expect(actions.fetchedEdition(testEdition))
    .toEqual({
      type: actions.FETCHED_EDITION,
      payload: {
        edition: testEdition
      }
    })
  })

  it('should create FETCH_EDITION_FAILED action', () => {
    expect(actions.fetchEditionFailed(testError))
    .toEqual({
      type: actions.FETCH_EDITION_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('should create SAVE_EDITION action', () => {
    expect(actions.saveEdition())
    .toEqual({
      type: actions.SAVE_EDITION
    })
  })

  it('should create SAVED_EDITION action', () => {
    expect(actions.savedEdition(testEdition))
    .toEqual({
      type: actions.SAVED_EDITION,
      payload: {
        edition: testEdition
      }
    })
  })

  it('should create SAVE_EDITION_FAILED action', () => {
    expect(actions.saveEditionFailed(testError))
    .toEqual({
      type: actions.SAVE_EDITION_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('should create PUBLISH action', () => {
    expect(actions.sendPublish())
    .toEqual({
      type: actions.PUBLISH
    })
  })

  it('should create PUBLISHED action', () => {
    expect(actions.published(testEdition))
    .toEqual({
      type: actions.PUBLISHED,
      payload: {
        edition: testEdition
      }
    })
  })

  it('should create PUBLISH_FAILED action', () => {
    expect(actions.sendPublishFailed(testError))
    .toEqual({
      type: actions.PUBLISH_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })
})
