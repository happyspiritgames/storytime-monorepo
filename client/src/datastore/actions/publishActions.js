import * as publishApi from '../../apis/publishApi'

export const START_TO_PUBLISH = 'START_TO_PUBLISH'
export const startToPublish = () => ({
  type: START_TO_PUBLISH
})

export const STARTED_TO_PUBLISH = 'STARTED_TO_PUBLISH'
export const startedToPublish = (proof) => ({
  type: STARTED_TO_PUBLISH,
  payload: {
    proof
  }
})

export const START_TO_PUBLISH_FAILED = 'START_TO_PUBLISH_FAILED'
export const startToPublishFailed = (error) => ({
  type: START_TO_PUBLISH_FAILED,
  payload: (
    error
  )
})

export const prepareToPublish = (draftId) => {
  // TODO implement custom handler for case where publishing already started
  return (dispatch) => {
    dispatch(startToPublish())
    publishApi.prepareToPublish(
      draftId,
      proof => dispatch(startedToPublish(proof)),
      error=> dispatch(startToPublishFailed(error))
    )
  }
}

export const FETCH_PROOFS = 'FETCH_PROOFS'
export const fetchProofs = () => ({
  type: FETCH_PROOFS
})

export const FETCHED_PROOFS = 'FETCHED_PROOFS'
export const fetchedProofs = (proofs) => ({
  type: FETCHED_PROOFS,
  payload: {
    proofs
  }
})

export const FETCH_PROOFS_FAILED = 'FETCH_PROOFS_FAILED'
export const fetchProofsFailed = (error) => ({
  type: FETCH_PROOFS_FAILED,
  payload: (
    error
  )
})

export const getProofs = (draftId) => {
  return (dispatch) => {
    dispatch(fetchProofs())
    publishApi.getProofs(
      draftId,
      proofs => dispatch(fetchedProofs(proofs)),
      error => dispatch(fetchProofsFailed(error))
    )
  }
}

export const FETCH_PROOF = 'FETCH_PROOF'
export const fetchProof = () => ({
  type: FETCH_PROOF
})

export const FETCHED_PROOF = 'FETCHED_PROOF'
export const fetchedProof = (proof) => ({
  type: FETCHED_PROOF,
  payload: {
    proof
  }
})

export const FETCH_PROOF_FAILED = 'FETCH_PROOF_FAILED'
export const fetchProofFailed = (error) => ({
  type: FETCH_PROOF_FAILED,
  payload: (
    error
  )
})

export const getProof = (draftId, version) => {
  return (dispatch) => {
    dispatch(fetchProof())
    publishApi.getProof(
      draftId, version,
      proofs => dispatch(fetchedProof(proofs)),
      error => dispatch(fetchProofFailed(error))
    )
  }
}

export const UPDATE_PROOF = 'UPDATE_PROOF'
export const updateProof = () => ({
  type: UPDATE_PROOF
})

export const UPDATED_PROOF = 'UPDATED_PROOF'
export const updatedProof = (proof) => ({
  type: UPDATED_PROOF,
  payload: {
    proof
  }
})

export const UPDATE_PROOF_FAILED = 'UPDATE_PROOF_FAILED'
export const updateProofFailed = (error) => ({
  type: UPDATE_PROOF_FAILED,
  payload: (
    error
  )
})

export const saveProof = (draftId, version, proofUpdate) => {
  return (dispatch) => {
    dispatch(updateProof())
    publishApi.updateProof(
      draftId, version, proofUpdate,
      proof => dispatch(updatedProof(proof)),
      error => dispatch(updateProofFailed(error))
    )
  }
}

export const PUBLISH = 'PUBLISH'
export const sendPublish = () => ({
  type: PUBLISH
})

export const PUBLISHED = 'PUBLISHED'
export const published = (proof) => ({
  type: PUBLISHED,
  payload: {
    proof
  }
})

export const PUBLISH_FAILED = 'PUBLISH_FAILED'
export const publishFailed = (error) => ({
  type: PUBLISH_FAILED,
  payload: (
    error
  )
})

export const publish = (draftId, version) => {
  return (dispatch) => {
    dispatch(sendPublish())
    publishApi.publish(
      draftId, version,
      proof => dispatch(published(proof)),
      error => dispatch(publishFailed(error))
    )
  }
}
