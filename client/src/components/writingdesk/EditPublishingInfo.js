import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { proofShape, draftShape } from '../../datastore/dataShapes'

export default class EditPublishingInfo extends Component {
  static propTypes = {
    draft: draftShape,
    proof: proofShape,
    getProof: PropTypes.func,
    saveProof: PropTypes.func,
    publish: PropTypes.func
  }

  state = {
    activeUpdate: {
      storyKey: '',
      penName: '',
      rating: '',
      genre: {
        toAssign: [],
        toUnassign: []
      }
    },
    isLoading: false
  }

  establishInitialState = (draft, proof) => {
    const activeUpdate = this.state.activeUpdate
    if (proof.storyKey) {
      activeUpdate.storyKey = proof.storyKey
    }
    if (proof.penName) {
      activeUpdate.penName = proof.penName
    }
    if (proof.rating) {
      activeUpdate.rating = proof.rating
    }
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
  }

  handleSave = () => {
    const { draftId, version } = this.props.match.params
    this.props.saveProof(draftId, version, this.state.activeUpdate)
  }

  handlePublish = () => {
    const { draftId, version } = this.props.match.params
    this.props.publish(draftId, version)
  }

  playStory = () => {
    console.alert('Someday this may actually do something.')
  }

  componentDidMount() {
    const { draftId, version } = this.props.match.params
    if (!this.props.draft) {
      this.props.loadDraft(draftId)
    }
    this.props.getProof(draftId, version)
  }

  render() {
    const { draft, proof } = this.props
    if (!draft || !proof) {
      return (
        <h1>Loading...</h1>
      )
    }
    const { draftId, title } = draft.summary
    const { activeProof } = this.state

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
                      <small className="form-text text-muted">For now, use the random key your story was assigned.</small>
                      <small className="form-text text-muted">In the future, you can change to something more fun.</small>
                      <input
                        className="form-control"
                        type="text"
                        id="storyKey"
                        value={activeProof.storyKey}
                        onChange={this.handleChange}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Content Rating</label>
                      <small className="form-text text-muted">Age group for whom your story-game is appropriate.</small>
                      <small className="form-text text-muted">Take your best guess. We might adjust this after review.</small>
                      <select className="form-control" id="rating" value={this.state.rating} onChange={this.handleChange}>
                        <option value="">--Not Rated--</option>
                        <option value="Y">Youth</option>
                        <option value="Y7">Youth Age 7+</option>
                        <option value="14">Teen</option>
                        <option value="G">General (G)</option>
                        <option value="PG">Parental Guidance (PG)</option>
                        <option value="MA">Mature</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <small className="form-text text-muted">What kind of story is this? Choose from 1 to 3 of the following options.</small>
                  <div className="form-row">
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-adventure" />
                        <label className="form-check-label" htmlFor="genre-adventure">Adventure</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-fantasy" />
                        <label className="form-check-label" htmlFor="genre-fantasy">Fantasy</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked="" id="genre-scifi" />
                        <label className="form-check-label" htmlFor="genre-scifi">Science Fiction</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-romance" />
                        <label className="form-check-label" htmlFor="genre-romance">Romance</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-drama" />
                        <label className="form-check-label" htmlFor="genre-drama">Drama</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-mystery" />
                        <label className="form-check-label" htmlFor="genre-mystery">Mystery</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-satire" />
                        <label className="form-check-label" htmlFor="genre-satire">Satire</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-historical" />
                        <label className="form-check-label" htmlFor="genre-historical">Historical</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-biography" />
                        <label className="form-check-label" htmlFor="genre-biography">Biographical</label>
                      </div>
                    </div>
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
