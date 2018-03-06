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
    profileUpdates: playerProfileShape,
    editMode: PropTypes.bool,
    loadProfile: PropTypes.func,
    saveProfile: PropTypes.func
  }

  componentDidMount() {
    this.props.loadProfile()
  }

  render() {
    const { profile, profileUpdates, editMode, saveProfile } = this.props
    return (
      <div id="account">
        <PlayerProfile profile={profile} edit={editMode} />
        <ProfileEditPane profileUpdates={profileUpdates} save={saveProfile} cancel={() => console.log('implement cancel')} />
        <TermsOfAuthor agreedOn={profile.agreedToTermsOfAuthorOn} />
      </div>
    )
  }
}
