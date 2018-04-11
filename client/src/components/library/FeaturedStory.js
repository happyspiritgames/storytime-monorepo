import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { editionShape } from '../../datastore/dataShapes'

export default class FeaturedStory extends Component {
  static propTypes = {
    edition: editionShape,
    play: PropTypes.func.isRequired
  }

  render() {
    const { edition, play } = this.props
    const { editionKey, summary } = edition
    return (
      <div className="jumbotron">
        <h1>{summary.title}</h1>
        <h4 className="text-muted">by {summary.penName}</h4>
        <p><em>{summary.tagLine}</em></p>
        <p>{summary.about}</p>
        <p>
          <button
            className="btn btn-primary"
            onClick={() => { play(editionKey) }}
          >Play</button>
        </p>
      </div>
    )
  }
}