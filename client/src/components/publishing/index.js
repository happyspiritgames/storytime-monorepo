import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { proofShape } from '../../datastore/dataShapes'

export default class Publishing extends Component {
  static propTypes = {
    proof: proofShape,
    loadProof: PropTypes.func,
    saveProof: PropTypes.func,
    publish: PropTypes.func
  }

  state = { storyKey: 'blargy', rating: '14' }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  save = () => {
    console.log('clicked save')
  }

  publish = () => {
    console.log('clicked publish')
  }

  playStory = () => {
    console.log('clicked play story')
  }

  render() {
    const { proof } = this.props
    const { draftId } = this.props.match.params
    const title = proof ? proof.title : 'Untitled'

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
            <h3 className="text-center">Polish, Proof and Publish</h3>
            <h4 className="text-center">Polish</h4>
            <form>
              <fieldset>
                <legend className="text-info">Classify your story-game</legend>
                <div className="form-row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Story Unique Key</label>
                      <small className="form-text text-muted">Use the random key or invent something more fun.</small>
                      <input className="form-control" type="text" id="storyKey" value={this.state.storyKey} onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Content Rating</label>
                      <small className="form-text text-muted">Age group for whom your story-game is appropriate.</small>
                      <select className="form-control" id="rating" value={this.state.rating} onChange={this.handleChange}>
                        <optgroup label="This is a group">
                          <option value="Y">Youth</option>
                          <option value="Y7">Youth Age 7+</option>
                          <option value="14">Teen</option>
                          <option value="G">General (G)</option>
                          <option value="PG">Parental Guidance (PG)</option>
                          <option value="MA">Mature</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Genre</label>
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
            <h4 className="text-center">Proof</h4>
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
                    <h4 className="card-title"><em>My First Story</em></h4>
                    <h6 className="card-subtitle">by Bubba Gump</h6>
                    <p className="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
                    <button className="btn btn-primary" type="button" onClick={this.playStory}>Play</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h4 className="text-center">Publish</h4>
                <p>Your story has not been published.</p>
                <p>Your story was published on March 31, 2018 at 4:30 PM.</p>
                <button className="btn btn-primary" type="button" onClick={this.publish}>Publish Now - Do It - Make it so!</button>
                <p>(Note: publishing happens once. After that, classifications can change, but you cannot re-publish. Can always go through the publishing cycle again and publish a new version. Should make it easy to delete non-current published versions.)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
