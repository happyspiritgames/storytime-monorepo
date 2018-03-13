import { connect } from 'react-redux'
import WritingDesk from './WritingDesk'
import { retrieveDraftProjects } from '../../datastore/actions'

const mapStateToProps = state => {
  const draftProjects = state.writingDesk.draftProjects.map(storyId => state.drafts[storyId])
  return {
    draftProjects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDrafts: () => dispatch(retrieveDraftProjects())
  }
}

const WritingDeskPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WritingDesk)

export default WritingDeskPage
