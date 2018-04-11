import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadCatalog } from '../../datastore/actions'
import Library from './Library'

const mapStateToProps = (state) => {
  const isLoaded = state.library.isLoaded
  let catalog = isLoaded ? state.library.catalog : undefined
  let editions
  if (isLoaded) {
    catalog = state.library.catalog
    editions = state.editions
  }
  return {
    isLoaded,
    catalog,
    editions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCatalog: () => dispatch(loadCatalog()),
    play: (editionKey) => { dispatch(push(`/reader/${editionKey}`)) }
  }
}

const LibraryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)

export default LibraryPage
