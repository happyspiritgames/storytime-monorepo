import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayerProfile from './PlayerProfile'
import ProfileEditPane from './ProfileEditPane'
import TermsOfAuthor from './TermsOfAuthor'
import { playerProfileShape } from '../../datastore/dataShapes'
import './account.css'

export default class Account extends Component {
  static propTypes = {
    profile: playerProfileShape,
    editMode: PropTypes.bool,
    loadProfile: PropTypes.func,
    editProfile: PropTypes.func,
    saveProfileChanges: PropTypes.func,
    cancelEditProfile: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      showAuthorTerms: false
    }
  }

  handleShowAuthorTerms = () => {
    this.setState({ showAuthorTerms: true })
  }

  handleAgreeToAuthorTerms = () => {
    // TODO hook up action to invoke api call to service
    this.setState({ showAuthorTerms: false })
  }

  handleCancelFromAuthorTerms = () => {
    // TODO hook up action to invoke api call to service
    this.setState({ showAuthorTerms: false })
  }

  componentDidMount() {
    this.props.loadProfile()
    this.setState({ isAuthor: this.props.profile && !!this.props.profile.authorOptInAt })
  }

  render() {
    const { profile, editMode, editProfile, saveProfileChanges, cancelEditProfile } = this.props
    const { isAuthor, showAuthorTerms } = this.state
    return (
      <div id="account">
        <PlayerProfile
          profile={profile}
        />
        <div className="btn-group center" role="group">
          <button className="btn btn-primary" type="button" onClick={editProfile} disabled={editMode}>
            <i className="icon ion-edit"></i>&nbsp;Change Profile
          </button>
        { !isAuthor &&
          <button className="btn btn-primary" type="button" onClick={this.handleShowAuthorTerms}>
            <i className="icon ion-checkmark"></i>&nbsp;Become an Author
          </button>
        }
        </div>
      { editMode &&
        <ProfileEditPane
          profile={profile}
          save={saveProfileChanges}
          cancel={cancelEditProfile}
        />
      }
      { showAuthorTerms &&
        <TermsOfAuthor
          onAgree={this.handleAgreeToAuthorTerms}
          onCancel={this.handleCancelFromAuthorTerms}
          readOnly={!!profile.authorOptInAt}
        />
      }
      </div>
    )
  }
}
