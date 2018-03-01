import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { storySummaryShape } from '../../datastore/dataShapes'

export default class FeaturedStory extends Component {
  static propTypes = {
    storySummary: storySummaryShape,
    onPlay: PropTypes.func.isRequired
  }

  render() {
    const { storySummary, onPlay } = this.props
    const { storyId, title, penName, tagLine, about } = storySummary
    return (
      <div className="jumbotron">
        <h1>{title}</h1>
        <h4 className="text-muted">by {penName}</h4>
        <p><em>{tagLine}</em></p>
        <p>{about}</p>
        <p><a className="btn btn-primary" role="button" href="" onClick={ () => {onPlay(storyId)} }>Play</a></p>
      </div>
    )
  }
}