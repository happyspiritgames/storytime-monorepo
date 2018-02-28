import { connect } from 'react-redux'
import Reader from '../components/reader'
import { begin, goToScene } from '../datastore/actions';

const mapStateToProps = state => ({
  status: state.reader.status,
  summary: state.reader.summary,
  scene: state.reader.scenes[state.reader.currentSceneId]
})

const mapDispatchToProps = dispatch => {
  return {
    onBegin: storyId => {
      dispatch(begin(storyId))
    },
    onGoToScene: sceneId => {
      dispatch(goToScene(sceneId))
    },
    dispatch
  }
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
