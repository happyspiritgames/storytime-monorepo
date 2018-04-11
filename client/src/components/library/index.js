import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadCatalog } from '../../datastore/actions'
import Library from './Library'

const mapStateToProps = (state) => {
  const isLoaded = state.library.isLoaded
  let catalog
  let featured
  let editions
  if (isLoaded) {
    editions = state.editions
    catalog = state.library.catalog
    if (catalog.editions.length) {
      featured = editions[catalog.editions[0]]
    }
  }
  return {
    isLoaded,
    editions,
    catalog,
    featured
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
