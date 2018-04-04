import { connect } from 'react-redux'
import Publishing from './Publishing'
import {
  prepareToPublish,
  getProofs,
  getProof,
  updateProof,
  publish
} from '../../datastore/actions'

const mapStateToProps = state => {
  let draftSummary
  let activeProof
  let proofs
  if (state.writingDesk) {
    draftSummary = state.writingDesk.activeDraft.summary
    activeProof = (state.writingDesk.activeProof)
      ? state.writingDesk.proofs[state.writingDesk.activeProof]
      : undefined
    if (state.writingDesk.proofs) {
      proofs = Object.values(state.writingDesk.proofs)
    }
  }
  return {
    draftSummary,
    activeProof,
    proofs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    prepareToPublish: (draftId) => dispatch(prepareToPublish(draftId)),
    getProofs: (draftId) => dispatch(getProofs(draftId)),
    getProof: (draftId, version) => dispatch(getProof(draftId, version)),
    updateProof: (draftId, version, proofUpdate) => dispatch(updateProof(draftId, version, proofUpdate)),
    publish: (draftId, version) => dispatch(publish(draftId, version))
  }
}

const PublishingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Publishing)

export default PublishingPage
