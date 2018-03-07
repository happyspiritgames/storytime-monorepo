import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayerProfile from './PlayerProfile'
import ProfileEditPane from './ProfileEditPane'
import TermsOfAuthor from './TermsOfAuthor'
import { playerProfileShape, profileChangeShape } from '../../datastore/dataShapes'
import './account.css'

export default class Account extends Component {
  static propTypes = {
    profile: playerProfileShape,
    editMode: PropTypes.bool,
    profileChanges: profileChangeShape,
    loadProfile: PropTypes.func,
    editProfile: PropTypes.func,
    changeProfile: PropTypes.func,
    saveProfile: PropTypes.func
  }

  componentDidMount() {
    this.props.loadProfile()
  }

  render() {
    const { profile, editMode, profileChanges, editProfile, changeProfile, saveProfile } = this.props
    return (
      <div id="account">
        <PlayerProfile
          profile={profile}
          editMode={editMode}
          edit={editProfile}
        />
        <ProfileEditPane
          profileChanges={profileChanges}
          change={changeProfile}
          save={saveProfile}
          cancel={() => console.log('implement cancel')}
        />
        <TermsOfAuthor agreedOn={profile.authorOptInAt} />
      </div>
    )
  }
}
