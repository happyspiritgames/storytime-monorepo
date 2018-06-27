import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { editionShape, draftShape } from '../../datastore/dataShapes'
import { formatDateTime } from '../../util/formatter'
import StoryEditTabs from './StoryEditTabs'

export default class PublishingSummary extends Component {
  static propTypes = {
    draft: draftShape,
    editions: PropTypes.arrayOf(editionShape),
    loadDraft: PropTypes.func,
    loadEditions: PropTypes.func,
    startNewEdition: PropTypes.func
  }

  refreshEditions = (storyId) => {
    this.props.loadEditions(storyId)
  }

  componentDidMount() {
    console.log('componentDidMount', this.props)
    const { draftId } = this.props.match.params
    if (!this.props.draft) {
      this.props.loadDraft(draftId)
    }
    this.refreshEditions(draftId)
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps new', newProps, 'old', this.props)
    if (newProps.match.params.draftId !== this.props.match.params.draftId) {
      this.refreshEditions(newProps.match.params.draftId)
    }
  }

  renderEditions() {
    const { draftId } = this.props.match.params
    let rows
    let foundUnpublished
    let buttonMessage
    const { editions } = this.props
    if (editions && editions.length) {
      const sortedEditions = editions.sort((one, two) => {return two.version - one.version})
      rows = sortedEditions.map(edition => {
        let published
        let rating = edition.rating ? edition.rating : 'unrated'
        let genre = edition.genre && edition.genre.length ? edition.genre.join(', ') : 'unclassified'
        if (edition.publishedAt) {
          published = formatDateTime(edition.publishedAt)
          buttonMessage = 'Reclassify'
        } else {
          foundUnpublished = true
          published = 'Not yet...'
          buttonMessage = 'Classify, Review, and Publish'
        }
        const summary = edition.summary
        return (
          <li key={edition.editionKey} className="list-group-item">
            <p>Version {edition.version} of story <em>{summary.title}</em> by {summary.penName} (key={edition.editionKey})<br/>
              <b>Rating:</b> {rating} <b>Genre:</b> {genre} <b>Published:</b> {published}<br/>
              <Link to={`/publish/${edition.storyId}/${edition.editionKey}`}>{buttonMessage}</Link></p>
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
        <button onClick={() => this.props.startNewEdition(draftId)}>Create new edition (unpublished)</button>
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
    const renderedEditions = this.renderEditions()
    return (
      <div id="publishing">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${storyId}`}>{title}</Link></li>
          <li className="breadcrumb-item">Editions</li>
        </ol>
        <h4 className="text-center">Story Editor</h4>
        <StoryEditTabs summary={draft.summary} activeTab="publish" />
        <div className="row section">
          <div className="col">
            <h4 className="text-center">Editions</h4>
            {renderedEditions}
          </div>
        </div>
      </div>
    )
  }
}