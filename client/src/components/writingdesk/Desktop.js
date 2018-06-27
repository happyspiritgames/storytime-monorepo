import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../util/formatter'
import AddStory from './AddStory'

export default class WritingDesk extends Component {
  static propTypes = {
    draftProjects: PropTypes.array,
    loadDrafts: PropTypes.func,
    createDraft: PropTypes.func
  }

  componentDidMount() {
    this.props.loadDrafts()
  }

  renderDraftProjectList(projects) {
    // TODO optimize performance by sorting on backend
    const sortedProjects = [...projects].sort((a, b) => {
      return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
    })
    return sortedProjects.map(draft => (
      <Link to={`/writingdesk/${draft.storyId}`} key={draft.storyId} className="list-group-item">
        <span><strong><em>{draft.title}</em></strong></span> (Updated on {formatDateTime(draft.updatedAt)})
        <i className="icon ion-edit float-right"></i>
      </Link>
    ))
  }

  renderPublishedList() {
    return (
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
    )
  }

  render() {
    const { draftProjects } = this.props
    const draftProjectList = this.renderDraftProjectList(draftProjects)
    // TODO const publishedList = this.renderPublishedList()
    const publishedList = null

    return (
      <div id="writing-desk">
        <h3 className="text-center">StoryTime Writing Desk</h3>
        <div className="row section">
          <div className="col">
            <h4>Your Projects</h4>
            <div className="list-group">
              {draftProjectList}
            </div>
            <AddStory addStory={this.props.createDraft} />
          </div>
        </div>
        {publishedList}
      </div>
    )
  }
}
