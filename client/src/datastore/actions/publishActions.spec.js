import * as actions from './index'
import {
  testError,
  testProof
} from '../testData'

describe('writing desk actions', () => {
  it('should create START_TO_PUBLISH action', () => {
    expect(actions.startToPublish())
    .toEqual({
      type: actions.START_TO_PUBLISH
    })
  })

  it('should create STARTED_TO_PUBLISH action', () => {
    expect(actions.startedToPublish(testProof))
    .toEqual({
      type: actions.STARTED_TO_PUBLISH,
      payload: {
        proof: testProof
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

  it('should create FETCH_PROOFS action', () => {
    expect(actions.fetchProofs())
    .toEqual({
      type: actions.FETCH_PROOFS
    })
  })

  it('should create FETCHED_PROOFS action', () => {
    expect(actions.fetchedProofs([testProof]))
    .toEqual({
      type: actions.FETCHED_PROOFS,
      payload: {
        proofs: [testProof]
      }
    })
  })

  it('should create FETCH_PROOFS_FAILED action', () => {
    expect(actions.fetchProofsFailed(testError))
    .toEqual({
      type: actions.FETCH_PROOFS_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('should create FETCH_PROOF action', () => {
    expect(actions.fetchProof())
    .toEqual({
      type: actions.FETCH_PROOF
    })
  })

  it('should create FETCHED_PROOF action', () => {
    expect(actions.fetchedProof(testProof))
    .toEqual({
      type: actions.FETCHED_PROOF,
      payload: {
        proof: testProof
      }
    })
  })

  it('should create FETCH_PROOF_FAILED action', () => {
    expect(actions.fetchProofFailed(testError))
    .toEqual({
      type: actions.FETCH_PROOF_FAILED,
      payload: {
        error: testError
      },
      error: true
    })
  })

  it('should create UPDATE_PROOF action', () => {
    expect(actions.updateProof())
    .toEqual({
      type: actions.UPDATE_PROOF
    })
  })

  it('should create UPDATED_PROOF action', () => {
    expect(actions.updatedProof(testProof))
    .toEqual({
      type: actions.UPDATED_PROOF,
      payload: {
        proof: testProof
      }
    })
  })

  it('should create UPDATE_PROOF_FAILED action', () => {
    expect(actions.updateProofFailed(testError))
    .toEqual({
      type: actions.UPDATE_PROOF_FAILED,
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
    expect(actions.published(testProof))
    .toEqual({
      type: actions.PUBLISHED,
      payload: {
        proof: testProof
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
