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

  componentDidMount() {
    this.props.loadProfile()
  }

  render() {
    const { profile, editMode, editProfile, saveProfileChanges, cancelEditProfile } = this.props
    return (
      <div id="account">
        <PlayerProfile
          profile={profile}
          editMode={editMode}
          edit={editProfile}
        />
      { editMode &&
        <ProfileEditPane
          profile={profile}
          save={saveProfileChanges}
          cancel={cancelEditProfile}
        />
      }
        <TermsOfAuthor agreedOn={profile.authorOptInAt} />
      </div>
    )
  }
}
