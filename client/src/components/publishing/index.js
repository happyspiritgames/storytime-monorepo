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

  save = () => {
    console.log('clicked save')
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
                      <input className="form-control" type="text" id="storyKey" value={this.state.storyKey} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label>Content Rating</label>
                      <small className="form-text text-muted">Age group for whom your story-game is appropriate.</small>
                      <select className="form-control" id="rating" value={this.state.rating}>
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
                        <label className="form-check-label" for="genre-adventure">Adventure</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-fantasy" />
                        <label className="form-check-label" for="genre-fantasy">Fantasy</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked="" id="genre-scifi" />
                        <label className="form-check-label" for="genre-scifi">Science Fiction</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-romance" />
                        <label className="form-check-label" for="genre-romance">Romance</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-drama" />
                        <label className="form-check-label" for="genre-drama">Drama</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-mystery" />
                        <label className="form-check-label" for="genre-mystery">Mystery</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-satire" />
                        <label className="form-check-label" for="genre-satire">Satire</label>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-historical" />
                        <label className="form-check-label" for="genre-historical">Historical</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-3">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="genre-biography" />
                        <label className="form-check-label" for="genre-biography">Biographical</label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="button" onClick={this.save}>Save</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
