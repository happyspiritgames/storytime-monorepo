import { connect } from 'react-redux'
import WritingDesk from './WritingDesk'
import { retrieveDraftProjects } from '../../datastore/actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    loadProject: () => retrieveDraftProjects()
  }
}

const WritingDeskPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(WritingDesk)

export default WritingDeskPage
