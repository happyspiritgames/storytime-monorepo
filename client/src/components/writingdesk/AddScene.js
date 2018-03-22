import React, { Component } from 'react'
import PropTypes from "prop-types"

export default class AddScene extends Component {
  static propTypes = {
    addScene: PropTypes.func
  }

  state = { title: '' }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    const readyToAdd = this.state.title && this.state.title !== ''
    return (
      <form>
        <fieldset>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Scene To Add</span>
            </div>
            <input
              className="form-control"
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                enabled={readyToAdd}
                onClick={() => this.props.addScene(this.state)}
              >
                <i className="icon ion-plus float-right"></i>
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}
