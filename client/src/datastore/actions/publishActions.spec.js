import * as actions from './index'
import {
  testError,
  testEdition
} from '../testData'

describe('publish actions', () => {
  it('should create CREATE_EDITION action', () => {
    expect(actions.createEdition())
    .toEqual({
      type: actions.CREATE_EDITION
    })
  })

  it('should create CREATED_EDITION action', () => {
    expect(actions.createdEdition(testEdition))
    .toEqual({
      type: actions.CREATED_EDITION,
      payload: {
        edition: testEdition
      }
    })
  })

  it('should create CREATE_EDITION_FAILED action', () => {
    expect(actions.createEditionFailed(testError))
    .toEqual({
      type: actions.CREATE_EDITION_FAILED,
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
