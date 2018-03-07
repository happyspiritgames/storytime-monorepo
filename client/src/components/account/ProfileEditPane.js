import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { playerProfileShape } from '../../datastore/dataShapes'

export default class ProfileEditPane extends Component {
  static propTypes = {
    profile: playerProfileShape,
    save: PropTypes.func,
    cancel: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      profileChanges: {
        id: '',
        nickname: '',
        penName: '',
        emailOptIn: false,
        authorOptIn: false
      }
    }
  }

  mapProfileToChanges = () => {
    const profile = this.props.profile
    const changes = (!profile) ? {}
      : {
          id: profile.id,
          nickname: profile.nickname,
          penName: profile.penName || '',
          emailOptIn: !!profile.emailOptInAt,
          authorOptIn: !!profile.authorOptInAt
        }
    return changes
  }

  componentDidMount() {
    this.setState({ profileChanges: this.mapProfileToChanges() })
  }

  // reflect updates to profile in store
  componentWillReceiveProps(nextProps) {
    if (this.props.profile !== nextProps.profile) {
      this.setState({ profileChanges: this.mapProfileToChanges() })
    }
  }

  handleChange = (event) => {
    const target = event.target
    let updateValue
    if (target.type === 'checkbox') {
      updateValue = target.checked
    } else {
      updateValue = target.value
    }
    let nextChanges = {
      ...this.state.profileChanges,
      [event.target.id]: updateValue
    }
    this.setState({ profileChanges: nextChanges })
  }

  handleSave = () => {
    this.props.save(this.state.profileChanges)
  }

  handleCancel = () => {
    this.props.cancel()
  }

  // TODO use local state for changes -- update locally, then call actions??

  render() {
    const { profileChanges } = this.state
    const { nickname, penName, emailOptIn, authorOptIn } = profileChanges;
    const emailOptInLabel = (emailOptIn)
      ? `You agree to receive email.`
      : 'Check to agree to receive email from Happy Spirit Games.'

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Player Profile</h4>
          <h6 className="text-muted card-subtitle mb-2 text-center">Let us know about you as a player.</h6>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              className="form-control"
              type="text"
              id="nickname"
              value={nickname}
              onChange={this.handleChange}
            />
            <small className="form-text text-muted">What would you like to be called?</small>
          </div>
        { authorOptIn &&
          <div className="form-group">
            <label htmlFor="penName">Pen Name</label>
            <input
              className="form-control"
              type="text"
              id="penName"
              value={penName}
              onChange={this.handleChange}
            />
            <small className="form-text text-muted">The name that shows up on published stories as the author. (only appears when t&amp;c for authors is agreed.)</small>
          </div>
        }
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="emailOptIn"
              checked={emailOptIn}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="emailOptIn">{emailOptInLabel}</label>
          </div>
          <div className="btn-group center" role="group">
            <button className="btn btn-primary" onClick={this.handleSave}>
              <i className="icon ion-checkmark"></i> Save
            </button>
            <button className="btn btn-warning" onClick={this.handleCancel}>
              <i className="icon ion-close"></i> Cancel
            </button>
          </div>

        </form>
      </div>
    )
  }
}