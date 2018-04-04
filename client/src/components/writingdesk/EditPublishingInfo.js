import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { proofShape, draftShape, codeLookupShape } from '../../datastore/dataShapes'

export default class EditPublishingInfo extends Component {
  static propTypes = {
    draft: draftShape,
    proof: proofShape,
    ratingCodes: PropTypes.arrayOf(codeLookupShape),
    genreCodes: PropTypes.arrayOf(codeLookupShape),
    loadProof: PropTypes.func,
    loadRatingCodes: PropTypes.func,
    loadGenreCodes: PropTypes.func,
    saveProof: PropTypes.func,
    publish: PropTypes.func
  }

  state = {
    activeUpdate: {
      storyKey: '',
      penName: '',
      rating: '',
      genre: []
    }
  }

  establishInitialState = (draft, proof) => {
    const activeUpdate = { ...this.state.activeUpdate }
    if (proof.storyKey) {
      activeUpdate.storyKey = proof.storyKey
    }
    if (proof.penName) {
      activeUpdate.penName = proof.penName
    }
    if (proof.rating) {
      activeUpdate.rating = proof.rating
    }
    this.setState({ activeUpdate })
  }

  handleChange = (event) => {
    const target = event.target
    let updateValue = target.value
    let activeUpdate = {
      ...this.state.activeUpdate,
      [target.id]: updateValue
    }
    this.setState({ activeUpdate })
  }

  handleChangeGenre = (event) => {
    console.log('handleChangeGenre')
    const { id, checked } = event.target
    const code = id.split('.')[1]
    let nextGenre
    if (checked && !nextGenre.includes(code)) {
      nextGenre = [...this.state.activeUpdate.genre].push(code)
    } else if (!checked && nextGenre.includes(code)) {
      nextGenre = this.state.activeUpdate.genre.filter(existingCode => existingCode !== code)
    }
    if (nextGenre) {
      this.setState({
        activeUpdate: {
          ...this.state.activeUpdate,
          genre: nextGenre
        }
      })
    }
  }

  handleSave = () => {
    console.log('handleSave')
    const { draftId, version } = this.props.match.params
    const originalGenre = this.props.proof.genre || []
    const updatedGenre = this.state.activeUpdate.genre || []
    const genreChanges = {
      toAssign: updatedGenre.filter(code => !originalGenre.includes(code)),
      toUnassign: originalGenre.filter(code => !updatedGenre.includes(code))
    }
    const update = {
      ...this.state.activeUpdate,
      genre: genreChanges
    }
    console.log('update to save', update)
    this.props.saveProof(draftId, version, update)
  }

  handlePublish = () => {
    const { draftId, version } = this.props.match.params
    this.props.publish(draftId, version)
  }

  playStory = () => {
    alert('Someday this may actually do something.')
  }

  componentDidMount() {
    console.log('componentDidMount')
    const { draftId, version } = this.props.match.params
    const { draft, proof, loadDraft, loadProof, loadRatingCodes, loadGenreCodes } = this.props
    if (!draft) {
      loadDraft(draftId)
    }
    loadProof(draftId, version)
    loadRatingCodes()
    loadGenreCodes()
    if (draft && proof) {
      this.establishInitialState(draft, proof)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    if (nextProps.draft && nextProps.proof) {
      this.establishInitialState(nextProps.draft, nextProps.proof)
    }
  }

  renderGenreSelections() {
    const { genreCodes } = this.props
    return genreCodes.map(code => (
      <div key={code.code} className="col-3">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id={`genre.${code.code}`} onChange={this.handleChangeGenre}/>
          <label className="form-check-label" htmlFor={`genre.${code.code}`}>{code.displayName}</label>
        </div>
      </div>
    ))
  }

  render() {
    console.log(this.state.activeUpdate)
    const { draft, proof, ratingCodes, genreCodes } = this.props
    if (!draft || !proof || !ratingCodes || !genreCodes) {
      return (
        <h1>Loading...</h1>
      )
    }
    const { draftId, title } = draft.summary
    const { activeUpdate } = this.state
    const ratingOptions = ratingCodes.map(code => <option key={code.code} value={code.code}>{code.displayName}</option>)
    const genreSelections = this.renderGenreSelections()

    return (
      <div id="publishing">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/writingdesk">Projects</Link></li>
          <li className="breadcrumb-item"><Link to={`/writingdesk/${draftId}`}>{title}</Link></li>
          <li className="breadcrumb-item">Publishing</li>
        </ol>
        <div className="row section">
          <div className="col">
            <h3 className="text-center">Publishing</h3>
            <p>You are three steps away from publishing your story-game. The only thing you have to do is step 3, publish. Check out the other steps on your way down the page.</p>
            <h4 className="text-center">1. Classify your story-game</h4>
            <form>
              <fieldset>
                <div className="form-row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Story Unique Key</label>
                      <small className="form-text text-muted">For now, use the random key your story was assigned. In the future, you can change to something more fun.</small>
                      <input
                        className="form-control"
                        type="text"
                        id="storyKey"
                        value={activeUpdate.storyKey}
                        onChange={this.handleChange}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Pen Name</label>
                      <small className="form-text text-muted">Who you want to be known as. Use your own name or something more elusive.</small>
                      <input
                        className="form-control"
                        type="text"
                        id="penName"
                        value={activeUpdate.penName}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
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
                <button className="btn btn-primary" type="button" onClick={this.save}>Save</button>
              </fieldset>
            </form>
            <h4 className="text-center">2. Proof</h4>
            <div className="row">
              <div className="col">
                <p>This is how your story-game will appear in the catalog. If it looks good, you are all set.</p>
                <p>To make changes, you have to return to the draft.</p>
                <p><Link to={`/writingdesk/${draftId}`}>Return to story editor.</Link></p>
              </div>
              <div className="col">
                <div className="card">
                  <img className="card-img-top w-100 d-block" src="" alt="" />
                  <div className="card-body">
                    <h4 className="card-title"><em>{proof.title}</em></h4>
                    <h6 className="card-subtitle">by {proof.penName}</h6>
                    <p className="card-text">{proof.about}</p>
                    <button className="btn btn-primary" type="button" onClick={this.playStory}>Play</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4 className="text-center">3. Publish</h4>
                <p>Your story has not been published.</p>
                <p>Your story was published on {proof.publishedAt}.</p>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={this.publish}
                >Publish Now - Do It - Make it so!</button>
                <p>(Note: publishing happens once. After that, classifications can change, but you cannot re-publish. Can always go through the publishing cycle again and publish a new version. Should make it easy to delete non-current published versions.)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
