import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { storySummaryShape } from '../../datastore/dataShapes'
import FeaturedStory from './FeaturedStory'
import Catalog from './Catalog'

export default class Library extends Component {
  static propTypes = {
    catalog: PropTypes.arrayOf(storySummaryShape),
    featured: storySummaryShape,
    onPlay: PropTypes.func.isRequired,
    onLoadCatalog: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (!this.props.catalog || this.props.catalog.length === 0) {
      this.props.onLoadCatalog()
    }
  }

  render() {
    const { catalog, featured, onPlay } = this.props
    const content = (!featured || catalog.length === 0)
      ? <h3>Loading...</h3>
      : [
        <FeaturedStory key='featured' storySummary={featured} onPlay={onPlay} />,
        <Catalog key='catalog' summaries={catalog} onPlay={onPlay} />
      ]

    return (
      <div id="library">
        { content }
      </div>
    )
  }
}
