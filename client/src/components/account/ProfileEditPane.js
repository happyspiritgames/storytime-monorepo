import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { playerProfileShape } from '../../datastore/dataShapes'
import { formatDate } from '../../util/formatter'

export default class ProfileEditPane extends Component {
  static propTypes = {
    profileUpdate: playerProfileShape,
    save: PropTypes.func,
    cancel: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      editMode: false
    }
  }

  onEdit = () => {
    this.setState({
      editMode: true
    })
  }

  onSave = () => {
    this.setState({
      editMode: false
    })
  }

  render() {
    const { profileUpdate } = this.props
    if (!profileUpdate) {
      // must not be editing; bail out
      return null
    }

    const { nickname, agreedToEmailOn, penName } = profileUpdate;
    const agreeToEmailLabel = (agreedToEmailOn)
      ? `You agreed to receive email on ${formatDate(agreedToEmailOn)}.`
      : 'Check to agree to receive email from Happy Spirit Games.'

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Player Profile</h4>
          <h6 className="text-muted card-subtitle mb-2 text-center">Let us know about you as a player.</h6>
        </div>
        <form>
          <div className="form-group">
            <label>Nickname</label>
            <input className="form-control" type="text" value={nickname} />
            <small className="form-text text-muted">What would you like to be called?</small>
          </div>
          <div className="form-group">
            <label>Pen name</label>
            <input className="form-control" type="text" value={penName} />
            <small className="form-text text-muted">The name that shows up on published stories as the author. (only appears when t&amp;c for authors is agreed.)</small>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="formCheck-1" checked={agreedToEmailOn} />
            <label className="form-check-label" for="formCheck-1">{agreeToEmailLabel}</label>
          </div>
          <button className="btn btn-primary action-button" type="button" onClick={this.onSave}>Save Changes</button>
        </form>
      </div>
    )
  }
}