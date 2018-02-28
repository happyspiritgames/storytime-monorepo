import { connect } from 'react-redux'
import Reader from '../components/reader'
import {
  fetchSummary,
  loadSummary,
  fetchScene,
  loadScene,
  beginStory,
  visitScene
} from '../datastore/actions';

const mapStateToProps = (state) => ({
  status: state.reader.status,
  summary: state.reader.summary,
  scene: state.reader.scenes[state.reader.currentSceneId]
})

const mapDispatchToProps = {
  onFetchStory: fetchSummary,
  onLoadSummary: loadSummary,
  onFetchScene: fetchScene,
  onLoadScene: loadScene,
  onBeginStory: beginStory,
  onVisitScene: visitScene
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
