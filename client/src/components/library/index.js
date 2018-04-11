import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { loadCatalog } from '../../datastore/actions'
import Library from './Library'

const mapStateToProps = (state) => {
  let editionKeys = (state.library.isLoaded) ? state.library.catalog.editions : []
  const catalog = editionKeys.map(editionKey => state.editions[editionKey])
  return {
    catalog
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadCatalog: () => dispatch(loadCatalog()),
    onPlay: storyId => dispatch(push(`/reader/${storyId}`))
  }
}

const LibraryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)

export default LibraryPage
