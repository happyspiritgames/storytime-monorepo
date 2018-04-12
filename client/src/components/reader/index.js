import { connect } from 'react-redux'
import Reader from './Reader'
import { playGame, visitScene } from '../../datastore/actions'

const mapStateToProps = (state, ownProps) => {
  const { editionKey } = ownProps.match.params
  const { activeEdition, activeScene } = state.reader

  let edition
  let scene

  /*
   * try to set props.
   * if no match or not found, leave undefined.
   * Reader life cycle methods should look for whatever needs to be loaded,
   * and trigger fetch actions as needed.
   */

  if (activeEdition && editionKey !== activeEdition) {
    console.log('We have changed editions! Re-group!')
  } else {
    edition = state.editions[editionKey]
  }

  if (edition) {
    if (edition.scenes) {
      const activeSceneId = activeScene
        ? state.reader.activeScene
        : edition.summary.firstSceneId
      scene = edition.scenes[activeSceneId]
    }
  }
  return {
    edition,
    scene
  }
}

const mapDispatchToProps = dispatch => {
  return {
    play: (editionKey) => dispatch(playGame(editionKey)),
    goToScene: (sceneId) => dispatch(visitScene(sceneId))
  }
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
