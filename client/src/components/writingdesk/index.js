import { connect } from 'react-redux'
import WritingDesk from './WritingDesk'
import {
  retrieveDraftProjects,
  saveDraftSummary,
  retrieveDraft,
  startNewDraft,
  retrieveDraftScene,
  updateDraftScene,
  retrieveDraftSignpost,
  updateDraftSignpost,
  prepareToPublish,
  getProofs,
  getProof,
  updateProof,
  publish
} from '../../datastore/actions'

const mapStateToProps = state => {
  const writingDesk = state.writingDesk
  const draftProjects = writingDesk.draftProjects.map(storyId => state.drafts[storyId])
  const activeProof = state.writingDesk.activeProof
    ? state.writingDesk.proofs[state.writingDesk.activeProof]
    : undefined
  const proofs = writingDesk.proofs ? Object.values(state.writingDesk.proofs) : undefined
  return {
    draftProjects,
    activeDraft: writingDesk.activeDraft,
    proofs,
    activeProof
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDrafts: () => dispatch(retrieveDraftProjects()),
    startNewDraft: () => dispatch(startNewDraft()),
    loadDraftForEdit: (storyId) => dispatch(retrieveDraft(storyId)),
    saveDraft: (summary) => dispatch(saveDraftSummary(summary)),
    loadDraftScene: (storyId, sceneId) => dispatch(retrieveDraftScene(storyId, sceneId)),
    saveDraftScene: (storyId, scene) => dispatch(updateDraftScene(storyId, scene)),
    loadDraftSignpost: (storyId, sceneId) => dispatch(retrieveDraftSignpost(storyId, sceneId)),
    updateDraftSignpost: (storyId, sceneId, signpostUpdates) => dispatch(updateDraftSignpost(storyId, sceneId, signpostUpdates)),
    prepareToPublish: (draftId) => dispatch(prepareToPublish(draftId)),
    getProofs: (draftId) => dispatch(getProofs(draftId)),
    getProof: (draftId, version) => dispatch(getProof(draftId, version)),
    updateProof: (draftId, version, proofUpdate) => dispatch(updateProof(draftId, version, proofUpdate)),
    publish: (draftId, version) => dispatch(publish(draftId, version))
  }
}

const WritingDeskPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WritingDesk)

export default WritingDeskPage
