import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StoryTimePage from '../StoryTimePage'
import FeaturedStory from './FeaturedStory'
import Catalog from './Catalog'
import { storySummaryShape } from '../../datastore/dataShapes'

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
    if (!featured || catalog.length === 0) {
      return (
        <StoryTimePage id="library">
          <h3>Loading...</h3>
        </StoryTimePage>
      )
    }
    return (
      <StoryTimePage id="library">
        <FeaturedStory storySummary={featured} onPlay={onPlay} />
        <Catalog summaries={catalog} onPlay={onPlay} />
      </StoryTimePage>
    );
  }
}
