import { connect } from 'react-redux'
import WritingDesk from './WritingDesk'
import {
  retrieveDraftProjects,
  saveDraftSummary,
  retrieveDraft,
  startNewDraft
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
    loadDraftForEdit: (storyId) => dispatch(retrieveDraft(storyId)),
    saveDraft: (summary) => dispatch(saveDraftSummary(summary)),
    startNewDraft: () => dispatch(startNewDraft())
  }
}

const WritingDeskPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WritingDesk)

export default WritingDeskPage
