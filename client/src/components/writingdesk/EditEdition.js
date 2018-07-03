import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { editionShape, draftShape, codeLookupShape } from '../../datastore/dataShapes'
import { formatDateTime } from '../../util/formatter'
import StoryEditTabs from './StoryEditTabs'

export default class EditEdition extends Component {
  static propTypes = {
    draft: draftShape,
    edition: editionShape,
    ratingCodes: PropTypes.arrayOf(codeLookupShape),
    genreCodes: PropTypes.arrayOf(codeLookupShape),
    loadDraft: PropTypes.func,
    loadEdition: PropTypes.func,
    loadRatingCodes: PropTypes.func,
    loadGenreCodes: PropTypes.func,
    saveEdition: PropTypes.func,
    publish: PropTypes.func
  }

  state = {
    rating: '',
    genre: []
  }

  establishInitialState = (edition) => {
    console.log('setting initial state', edition)
    this.setState({
      rating: edition.rating || '',
      genre: edition.genre ? [...edition.genre] : []
    })
  }

  handleChange = (event) => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }

  handleChangeGenre = (event) => {
    console.log('handleChangeGenre')
    const { id, checked } = event.target
    const code = id.split('.')[1]
    let nextGenre = this.state.genre
    if (checked && !nextGenre.includes(code)) {
      nextGenre.push(code)
    } else if (!checked && nextGenre.includes(code)) {
      nextGenre = nextGenre.filter(existingCode => existingCode !== code)
    }
    console.log('nextGenre', nextGenre)
    this.setState({
      genre: nextGenre
    })
  }

  handleSave = () => {
    console.log('handleSave')
    const { draftId, editionKey } = this.props.match.params
    const originalGenre = this.props.edition.genre || []
    const updatedGenre = this.state.genre || []
    console.log('original genre', originalGenre)
    console.log('updated genre', updatedGenre)
    const genreChanges = {
      toAssign: updatedGenre.filter(code => !originalGenre.includes(code)),
      toUnassign: originalGenre.filter(code => !updatedGenre.includes(code))
    }
    const update = {
      ...this.state,
      genre: genreChanges
    }
    console.log('update to save', update)
    this.props.saveEdition(draftId, editionKey, update)
  }

  handlePublish = () => {
    const { draftId, editionKey } = this.props.match.params
    this.props.publish(draftId, editionKey)
  }

  playStory = () => {
    const { editionKey } = this.props.match.params
    this.props.history.push(`/reader/${editionKey}`)
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { draftId, editionKey } = this.props.match.params
    const { draft, edition, loadDraft, loadEdition, loadRatingCodes, loadGenreCodes } = this.props
    if (!draft) {
      loadDraft(draftId)
    }
    loadEdition(draftId, editionKey)
    loadRatingCodes()
    loadGenreCodes()
    if (edition) {
      this.establishInitialState(edition)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    if (nextProps.edition) {
      console.log('will receive', nextProps.edition)
      this.establishInitialState(nextProps.edition)
    }
  }

  renderGenreSelections() {
    const { genreCodes } = this.props
    const selectedGenre = this.state.genre
    console.log('selected', selectedGenre)
    return genreCodes.map(lookup => {
      return (
        <div key={lookup.code} className="col-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`genre.${lookup.code}`}
              onChange={this.handleChangeGenre}
              checked={selectedGenre.includes(lookup.code)}
            />
            <label className="form-check-label" htmlFor={`genre.${lookup.code}`}>
              {lookup.displayName}
            </label>
          </div>
        </div>
      )
    })
  }

  render() {
    console.log(this.state)
    const { draft, edition, ratingCodes, genreCodes } = this.props
    if (!draft || !edition || !ratingCodes || !genreCodes) {
      return (
        <h1>Loading...</h1>
      )
    }
    const { storyId, title } = draft.summary
    const activeUpdate = this.state
    const ratingOptions = ratingCodes.map(code => <option key={code.code} value={code.code}>{code.displayName}</option>)
    const genreSelections = this.renderGenreSelections()
    const publishedMessage = edition.publishedAt
      ? `Congratulations! This edition of your story was published on ${formatDateTime(edition.publishedAt)}.`
      : 'This edition of your story has not been published. When you are ready, click the button below to publish.'
    const editionSummary = edition.summary

    return (
      <div id="publishing">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${storyId}`}>{title}</Link></li>
          <li className="breadcrumb-item">Edition {edition.version}</li>
        </ol>
        <StoryEditTabs summary={draft.summary} activeTab="publish" />
        <div className="row section">
          <div className="col">
            <h5>Classify</h5>
            <form>
              <fieldset>
                <div className="form-row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Content Rating</label>
                      <small className="form-text text-muted">Age group for whom your story-game is appropriate.</small>
                      <small className="form-text text-muted">Take your best guess. We might adjust this after review.</small>
                      <select className="form-control" id="rating" value={activeUpdate.rating} onChange={this.handleChange}>
                        <option value="">--Not Rated--</option>
                        {ratingOptions}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <small className="form-text text-muted">What kind of story is this? Choose from 1 to 3 of the following options.</small>
                  <div className="form-row">
                    {genreSelections}
                  </div>
                </div>
                <button className="btn btn-primary" type="button" onClick={this.handleSave}>Save</button>
              </fieldset>
            </form>
          </div>
          <div className="col">
            <h5>Review</h5>
            <p>See your game as players will see it. This is how it will look in the library.</p>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title"><em>{editionSummary.title}</em></h4>
                <h6 className="card-subtitle">by {editionSummary.penName}</h6>
                <p className="card-text">{editionSummary.tagLine}</p>
                <p className="card-text">{editionSummary.about}</p>
                <button className="btn btn-primary" type="button" onClick={this.playStory}>Play</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row section">
          <div className="col">
            <h5>Publish</h5>
            <p>{publishedMessage}</p>
          { !edition.publishedAt &&
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.handlePublish}
            >All set? Publish Now</button>
          }
          </div>
        </div>
      </div>
    )
  }
}
