import { connect } from 'react-redux'
import { visitScene } from '../actions'
import Reader from '../components/reader'

const mapStateToProps = (state) => ({
  summary: state.reader.story.summary,
  scene: state.reader.story.scenes[state.currentScene]
})

const mapDispatchToProps = {
  onVisitScene: visitScene
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
