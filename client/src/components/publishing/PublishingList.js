import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { proofShape, draftShape } from '../../datastore/dataShapes'

export default class PublishingList extends Component {
  static propTypes = {
    draft: draftShape,
    proofs: PropTypes.arrayOf(proofShape),
    loadProofs: PropTypes.func,
    begin: PropTypes.func
  }

  refreshProofs = (draftId) => {
    this.props.loadProofs(draftId)
  }

  componentDidMount() {
    console.log('componentDidMount', this.props)
    const { draftId } = this.props.match.params
    if (!this.props.draft) {
      this.props.loadDraft(draftId)
    }
    this.refreshProofs(draftId)
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps new', newProps, 'old', this.props)
    if (newProps.match.params.draftId !== this.props.match.params.draftId) {
      this.refreshProofs(newProps.match.params.draftId)
    }
  }

  renderVersionList() {
    const { draftId } = this.props.match.params
    let rows
    let foundUnpublished
    let buttonMessage
    const { proofs } = this.props
    if (proofs && proofs.length) {
      rows = proofs.map(proof => {
        let published
        let rating = proof.rating ? proof.rating : 'unknown'
        let genre = proof.genre && proof.genre.length ? proof.genre.join(', ') : 'unknown'
        if (proof.publishedAt) {
          published = `Published: ${proof.publishedAt}`
          buttonMessage = 'Reclassify'
        } else {
          foundUnpublished = true
          published = 'Unpublished'
          buttonMessage = 'Classify, Review, and Publish'
        }
        return (
          <li key={proof.version} className="list-group-item">
            <p>Version {proof.version}: <em>{proof.title}</em> by {proof.penName} ({proof.storyKey})</p>
            <p>Rating: {rating} Genre: {genre} {published}</p>
            <p><Link to={`/publish/${proof.draftId}/${proof.version}`}>{buttonMessage}</Link></p>
          </li>
        )
      })
    }
    return (
      <div>
        <ul className="list-group">
          {rows}
        </ul>
      { !foundUnpublished &&
        <button onClick={() => this.props.begin(draftId)}>Create new unpublished version</button>
      }
      </div>
    )
  }
  render() {
    const { draft } = this.props
    if (!draft) {
      return (
        <h1>Loading...</h1>
      )
    }
    const { storyId, title } = draft.summary
    const versions = this.renderVersionList()
    return (
      <div id="publishing">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${storyId}`}>{title}</Link></li>
          <li className="breadcrumb-item">Publishing</li>
        </ol>
        <div className="row section">
          <div className="col">
            <h3 className="text-center">Publish</h3>
            <h4 className="text-center">All Versions: Published and Unpublished</h4>
            {versions}
          </div>
        </div>
      </div>
    )
  }
}