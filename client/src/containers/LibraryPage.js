import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { stageCatalog } from '../datastore/actions'
import Library from '../components/library'

const mapStateToProps = (state) => {
  const catalog = state.library.catalog.map(storyId => state.summaries[storyId])
  const featured = (catalog.length === 0) ? undefined : state.summaries[state.library.catalog[0]]
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
      dispatch(stageCatalog())
    }
  }
}

const LibraryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)

export default LibraryPage
