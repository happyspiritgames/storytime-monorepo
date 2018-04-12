import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { editionShape } from '../../datastore/dataShapes'

export default class Catalog extends Component {
  static propTypes = {
    editions: PropTypes.arrayOf(editionShape),
    play: PropTypes.func.isRequired
  }

  renderCard(editionKey, summary) {
    const { play } = this.props
    const { title, penName, tagLine, about } = summary
      /*
        Put this under card, above card-body when story cover image is supported.
        <img className="card-img-top w-100 d-block" alt={title} />
      */
    return (
      <div key={editionKey} className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <h6 className="text-muted card-subtitle">by {penName}</h6>
          <p><em>{tagLine}</em></p>
          <p className="card-text">{about}</p>
          <p><button className="btn btn-primary" onClick={ () => {play(editionKey)} }>Play</button></p>
        </div>
      </div>
    )
  }

  render() {
    const { editions } = this.props
    let cards
    if (editions) {
      cards = editions.map(edition => this.renderCard(edition.editionKey, edition.summary))
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