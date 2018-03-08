import React, { Component } from 'react'

export default class EditScene extends Component {
  render() {
    return (
      <div id="edit-scene">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a><span>Projects</span></a></li>
          <li className="breadcrumb-item"><a><span>The Mission</span></a></li>
          <li className="breadcrumb-item"><a><span>Scene 1</span></a></li>
        </ol>
        <div className="row section">
          <div className="col">
            <h3>Scene</h3>
            <form>
              <fieldset>
                <legend className="text-info">Write to your heart's content…</legend>
                <div className="form-group">
                  <label>Scene Title</label>
                  <input className="form-control" type="text" name="title" />
                </div>
                <div className="form-group">
                  <label>Prose</label>
                  <small className="form-text text-muted">This is what people will read when they visit the scene.</small>
                  <textarea className="form-control" name="about"></textarea>
                </div>
                <div className="form-group">
                  <label>Next Scene Prompt</label>
                  <input className="form-control" type="text" name="tagLine" />
                  <small className="form-text text-muted">Optional text to display before the signpost of next scene options.</small>
                </div>
                <button className="btn btn-primary" type="button">Save Scene</button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="row section">
          <div className="col">
            <h3>Signpost</h3>
            <form>
              <fieldset>
                <legend className="text-info">Add a sign (where to go next)</legend>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Teaser</span>
                  </div>
                  <input className="form-control" type="text" name="teaser" placeholder="Explains the option to the player." />
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Goes to</span>
                  </div>
                  <select className="form-control" name="destinationScene">
                    <option value="new">Create new scene...</option>
                    <option value="sceneA" selected="">Scene A</option>
                    <option value="sceneB">Scene B</option>
                    <option value="sceneC">Scene C</option>
                  </select>
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="icon ion-plus"></i> Add
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
            <form>
              <fieldset>
                <legend className="text-info">Signs. Change whatever you like…</legend>
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Teaser</span>
                      </div>
                      <input className="form-control" type="text" value="Go to the left." />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="icon ion-trash-a"></i> Remove
                        </button>
                      </div>
                    </div>
                    <input className="form-control-plaintext" type="text" value="Goes to Scene: You Went Left (ID)" readonly="" />
                  </li>
                  <li className="list-group-item">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">Teaser</span>
                      </div>
                      <input className="form-control" type="text" value="Go to the right." />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <i className="icon ion-trash-a"></i> Remove
                        </button>
                      </div>
                    </div>
                    <input className="form-control-plaintext" type="text" value="Goes to Scene: You Went Right (ID)" readonly="" />
                  </li>
                  <li className="list-group-item">
                    <button className="btn btn-primary" type="button">
                      Save Changes to Signs
                    </button>
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
