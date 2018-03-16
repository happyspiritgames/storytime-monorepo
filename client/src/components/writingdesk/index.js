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
  updateDraftSignpost
} from '../../datastore/actions'

const mapStateToProps = state => {
  const desk = state.writingDesk
  const draftProjects = desk.draftProjects.map(storyId => state.drafts[storyId])
  const activeDraft = desk.activeDraft
  return {
    draftProjects,
    activeDraft
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
    updateDraftSignpost: (storyId, sceneId, signpostUpdates) => dispatch(updateDraftSignpost(storyId, signpostUpdates))
  }
}

const WritingDeskPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WritingDesk)

export default WritingDeskPage
