import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { refreshCatalog } from '../../datastore/actions'
import Library from './Library'

const mapStateToProps = (state) => {
  const catalog = state.library.catalog.map(storyId => state.stories[storyId].summary)
  const featured = (catalog.length > 0) ? state.stories[state.library.catalog[0]].summary : undefined
  return {
    catalog,
    featured
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlay: storyId => {
      dispatch(push(`/reader/${storyId}`))
    },
    onLoadCatalog: () => {
      dispatch(refreshCatalog())
    }
  }
}

const LibraryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)

export default LibraryPage
