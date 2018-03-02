import { connect } from 'react-redux'
import Reader from '../components/reader'
import { play, goToScene } from '../datastore/actions';

const mapStateToProps = (state, ownProps) => {
  const { storyId } = ownProps.match.params
  let summary, scene
  if (state.stories[storyId]) {
    summary = state.stories[storyId].summary
  }
  if (state.stories[storyId] && state.stories[storyId].scenes && state.reader.sceneId) {
    scene = state.stories[storyId].scenes[state.reader.sceneId]
  }
  return {
    status: state.reader.status,
    summary: summary,
    scene: scene
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlay: storyId => {
      dispatch(play(storyId))
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
