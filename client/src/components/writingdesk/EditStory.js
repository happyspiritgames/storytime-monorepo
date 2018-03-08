import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class EditStory extends Component {
  render() {
    return (
      <div id="edit-story">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a><span>Projects</span></a></li>
          <li className="breadcrumb-item"><a><span>The Mission</span></a></li>
        </ol>
        <div className="row section">
          <div className="col">
            <h3>Story Information</h3>
            <form>
              <fieldset>
                <legend className="text-info">Make changes if you like…</legend>
                <div className="form-group">
                  <label>Story Title</label>
                  <input className="form-control" type="text" name="title" />
                </div>
                <div className="form-group">
                  <label>Tag Line</label>
                  <input className="form-control" type="text" name="tagLine" />
                  <small className="form-text text-muted">A catchy phrase or sentence to attract readers to your story.</small>
                </div>
                <div className="form-group">
                  <label>About</label>
                  <textarea className="form-control" name="about"></textarea>
                  <small className="form-text text-muted">A paragraph or two that explains what your story is about.</small>
                </div>
                <button className="btn btn-primary" type="button">Save Story Information</button>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="row section">
          <div className="col">
            <h3>Scenes</h3>
            <form>
              <fieldset>
                <legend className="text-info">Add a scene</legend>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Title</span>
                  </div>
                  <input className="form-control" type="text" name="sceneTitle" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="icon ion-plus float-right"></i>
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
            <ul className="list-group">
              <li className="list-group-item">
                <span>Scene A Title</span>
                <Link to="/writingdesk/themission/A"><i className="icon ion-edit float-right"></i></Link>
              </li>
              <li className="list-group-item">
                <span>Scene B Title</span>
                <Link to="/writingdesk/themission/B"><i className="icon ion-edit float-right"></i></Link>
              </li>
              <li className="list-group-item">
                <span>Scene C Title</span>
                <Link to="/writingdesk/themission/C"><i className="icon ion-edit float-right"></i></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
