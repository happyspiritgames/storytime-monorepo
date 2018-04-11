import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { storySummaryShape } from '../../datastore/dataShapes'

export default class Catalog extends Component {
  static propTypes = {
    summaries: PropTypes.arrayOf(storySummaryShape),
    play: PropTypes.func.isRequired
  }

  renderCard(summary) {
    const { play } = this.props
    const { storyId, title, penName, tagLine, about } = summary
      /*
        Put this under card, above card-body when story cover image is supported.
        <img className="card-img-top w-100 d-block" alt={title} />
      */
    return (
      <div key={storyId} className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <h6 className="text-muted card-subtitle">by {penName}</h6>
          <p><em>{tagLine}</em></p>
          <p className="card-text">{about}</p>
          <p><button className="btn btn-primary" onClick={ () => {play(storyId)} }>Play</button></p>
        </div>
      </div>
    )
  }

  render() {
    const { summaries } = this.props
    let cards
    if (summaries) {
      cards = summaries.map(summary => this.renderCard(summary))
    } else {
      cards = []
    }
    return (
      <div className="card-group">
        {cards}
      </div>
    )
  }
}