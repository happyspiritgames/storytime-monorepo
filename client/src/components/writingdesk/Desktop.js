import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { newDraftId } from './EditStory'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    loadDrafts: PropTypes.func
  }

  componentDidMount() {
    this.props.loadDrafts()
  }

  renderDraftProjectList(projects) {
    return projects.map(draft => (
      <li key={draft.storyId} className="list-group-item">
        <span><strong><em>{draft.title}</em></strong></span>
        <Link to={`/writingdesk/${draft.storyId}`}><i className="icon ion-edit float-right"></i></Link>
        <p>2 scenes, 1 ending, last updated on February 12, 2018</p>
      </li>
    ))
  }

  render() {
    const { draftProjects } = this.props
    const draftProjectList = this.renderDraftProjectList(draftProjects)

    return (
      <div id="writing-desk">
        <h3 className="text-center">StoryTime Writing Desk</h3><img className="img-fluid" alt="wooden texture of a writing desk" />
        <div className="row section">
          <div className="col">
            <h4 className="text-center">Projects (In Progress)</h4>
            <ul className="list-group">
              {draftProjectList}
              <li className="list-group-item">
                <Link className="btn btn-primary" to={`/writingdesk/${newDraftId}`}>Start a new story</Link>
                <span className="text-muted help-text">Stories are created in draft mode. Nothing is shared until you publish.</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row section">
          <div className="col">
            <h4 className="text-center">Published</h4>
            <div className="card-group">
              <div className="card"><img className="card-img-top w-100 d-block" alt="story shingle" />
                <div className="card-body">
                  <h4 className="card-title"><em>My First Story</em></h4>
                  <h6 className="card-subtitle">by Bubba Gump</h6>
                  <p className="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
                  <button className="btn btn-primary" type="button">Play</button>
                </div>
              </div>
              <div className="card"><img className="card-img-top w-100 d-block" alt="story shingle" />
                <div className="card-body">
                  <h4 className="card-title"><em>Best Seller</em></h4>
                  <h6 className="card-subtitle">by Bubba Gump</h6>
                  <p className="card-text">Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
                  <button className="btn btn-primary" type="button">Play</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
