import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Library from '../components/library'

// TODO fix

const mapStateToProps = (state) => ({
  catalog: state.library.catalog,
  featured: state.library.featured
})

const mapDispatchToProps = {
  onVisitScene: push()  // TODO fix
}

const LibraryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)

export default LibraryPage
