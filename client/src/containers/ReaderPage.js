import { connect } from 'react-redux'
import Reader from '../components/reader'
import {
  begin,
  visitScene
} from '../datastore/actions';

const mapStateToProps = (state) => ({
  status: state.reader.status,
  summary: state.reader.summary,
  scene: state.reader.scenes[state.reader.currentSceneId]
})

const mapDispatchToProps = {
  onBegin: begin,
  onVisitScene: visitScene
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
