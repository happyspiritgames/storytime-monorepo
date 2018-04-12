import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { catalogShape, editionShape } from '../../datastore/dataShapes'
import FeaturedStory from './FeaturedStory'
import Catalog from './Catalog'

export default class Library extends Component {
  static propTypes = {
    isLoaded: PropTypes.bool,
    catalog: catalogShape,
    featured: editionShape,
    editions: PropTypes.object,
    loadCatalog: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.loadCatalog()
    }
  }

  renderEmpty() {
    return (
      <div id="library">
        <h3>Loading...</h3>
        <p>Hold tight while I figure out what is available.</p>
        <p>If you see this message for more than a few seconds, maybe something is wrong. Lost your connection, perhaps? Or maybe it's us. Sorry about that.</p>
      </div>
    )
  }

  render() {
    const { isLoaded, catalog, featured, editions, play } = this.props
    if (!isLoaded) {
      return this.renderEmpty()
    }

    // TODO make use of ratings and genre

    const catalogEditions = catalog.editions.map(key => editions[key])
    if (!catalogEditions.length) {
      return (
        <div id="library">
          <p>Looks like the library is empty. Anybody want to publish a game?</p>
        </div>
      )
    }
    return (
      <div id="library">
        <h1>Welcome to the StoryTime Library.</h1>
        <h3>Find a story to play.</h3>
        <FeaturedStory key='featured' edition={featured} play={play} />
        <Catalog key='catalog' editions={catalogEditions} play={play} />
      </div>
    )
  }
}
