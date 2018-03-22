import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EditSummary extends Component {
  static propTypes = {
    draftSummary: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired
  }

  state = { title: '', tagLine: '', about: '' }

  updateState = (summary) => {
    this.setState({
      storyId: summary.storyId,
      title: summary.title,
      tagLine: summary.tagLine,
      about: summary.about
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  clearChanges = () => {
    this.updateState(this.props.draftSummary)
  }

  handleSave = () => {
    this.props.save(this.state)
  }

  componentDidMount() {
    this.updateState(this.props.draftSummary)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.draftSummary !== this.props.draftSummary) {
      this.updateState(nextProps.draftSummary)
    }
  }

  render() {
    return (
      <form>
        <fieldset>
          <div className="form-group">
            <label>Story Title</label>
            <input
              className="form-control"
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Tag Line</label>
            <input
              className="form-control"
              type="text"
              id="tagLine"
              value={this.state.tagLine}
              onChange={this.handleChange}
            />
            <small className="form-text text-muted">A catchy phrase or sentence to attract readers to your story.</small>
          </div>
          <div className="form-group">
            <label>About</label>
            <textarea
              className="form-control"
              id="about"
              value={this.state.about}
              onChange={this.handleChange}
            ></textarea>
            <small className="form-text text-muted">A paragraph or two that explains what your story is about.</small>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.handleSave}
          >
            <i className="icon ion-checkmark"></i> Save
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={this.clearChanges}
          >
            <i className="icon ion-close"></i> Clear Changes
          </button>
        </fieldset>
      </form>
    )
  }
}