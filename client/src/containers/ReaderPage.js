import { connect } from 'react-redux'
import { visitScene } from '../actions'
import Reader from '../components/reader'

const mapStateToProps = (state) => ({
  status: state.reader.status,
  summary: state.reader.summary,
  scene: state.reader.scenes[state.currentScene]
})

const mapDispatchToProps = {
  onVisitScene: visitScene
}

const ReaderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader)

export default ReaderPage
