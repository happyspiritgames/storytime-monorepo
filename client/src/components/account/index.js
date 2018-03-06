import React, { Component } from 'react'
import PlayerProfile from './PlayerProfile'
import TermsOfAuthor from './TermsOfAuthor'
import './account.css'

const sampleProfile = {
  playerId: 'uuid',
  email: 'bubba@happyspiritgames.com',
  nickname: 'Bubba',
  agreedToEmailOn: new Date().toISOString(),
  agreedToTermsOfAuthorOn: new Date().toISOString(),
  penName: 'Bubba Gump'
}

export default class Account extends Component {
  render() {
    return (
      <div id="account">
        <PlayerProfile profile={sampleProfile} edit={false} />
        <TermsOfAuthor agreedOn={sampleProfile.agreedToTermsOfAuthorOn} />
      </div>
    )
  }
}
