import { connect } from 'react-redux'
import Reader from './Reader'
import { loadEdition, loadEditionScene, beginStory, visitScene } from '../../datastore/actions'

const mapStateToProps = (state, ownProps) => {
  const { editionKey } = ownProps.match.params
  const edition = state.editions[editionKey]
  let summary
  let scene
  if (edition) {
    summary = edition.summary
    if (edition.scenes) {
      scene = edition.scenes[summary.firstSceneId]
    }
  }
  return {
    summary: summary,
    scene: scene
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadEdition: (editionKey) => dispatch(loadEdition(editionKey)),
    loadEditionScene: (editionKey, sceneId) => dispatch(loadEditionScene(editionKey, sceneId)),
    beginStory: (editionKey) => dispatch(beginStory(editionKey)),
    visitScene: (sceneId) => dispatch(visitScene(sceneId))
  }
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
