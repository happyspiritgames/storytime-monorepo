import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Library from '../components/library'

const mapStateToProps = (state) => {
  const catalog = state.library.catalog.map(storyId => state.summaries[storyId])
  const featured = (catalog.length > 0) ? catalog[0].storyId : undefined
  return {
    catalog,
    featured
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlay: storyId => {
      dispatch(push(`/reader/${storyId}`))
    }
  }
}

const LibraryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)

export default LibraryPage
