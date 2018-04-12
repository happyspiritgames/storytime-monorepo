import { connect } from 'react-redux'
import Reader from './Reader'
import { playGame, goToScene } from '../../datastore/actions'

const mapStateToProps = (state, ownProps) => {
  const { editionKey } = ownProps.match.params
  const editions = state.editions
  const { activeEdition, activeScene } = state.reader

  let edition
  let scene

  // set edition if loaded and what's active matches URL parameter
  if (editionKey === activeEdition) {
    edition = editions[editionKey]
  } else {
    console.log('URL param editionKey did not match reader.activeEdition; need a cycle to switch games')
  }

  // set scene if loaded
  if (edition && edition.scenes && activeScene) {
    scene = edition.scenes[activeScene]
  }

  return {
    edition,
    scene
  }
}

const mapDispatchToProps = dispatch => {
  return {
    playGame: (editionKey) => dispatch(playGame(editionKey)),
    goToScene: (sceneId) => dispatch(goToScene(sceneId))
  }
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
