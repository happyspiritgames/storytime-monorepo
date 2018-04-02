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
  let activeProof
  let proofs
  if (state.writingDesk) {
    activeProof = state.writingDesk.activeProof
    proofs = state.writingDesk.proofs
  }
  return {
    activeProof,
    proofs
  }
}

const mapDispatchToProps = dispatch => {
  // TODO find a way to extract draftId so wrapped component does not have to pass it back -- ownProps.match.params?
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
