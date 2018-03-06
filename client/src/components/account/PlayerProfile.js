import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { playerProfileShape } from '../../datastore/dataShapes'
import { formatDate } from '../../util/formatter'

export default class PlayerProfile extends Component {
  static propTypes = {
    profile: playerProfileShape,
    edit: PropTypes.bool
  }

  render() {
    const { profile, edit } = this.props
    const { email, nickname, agreedToEmailOn, agreedToTermsOfAuthorOn, penName } = profile
    const agreedToEmailMessage = (agreedToEmailOn)
      ? `Yes, agreed to email on ${formatDate(agreedToEmailOn)}`
      : 'No, I do not want to receive email from Happy Spirit Games.';
    const agreeToTermsOfAuthorMessage = (agreedToTermsOfAuthorOn)
      ? `Yes, agreed to terms on ${formatDate(agreedToTermsOfAuthorOn)}`
      : 'No. Agree to terms and conditions for authors (below) to gain access.'

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Player Profile</h4>
          <h6 className="text-muted card-subtitle mb-2 text-center">Let us know about you as a player.</h6>
        </div>
        <div>
          <div className="row profile-row">
            <div className="col-3 text-right"><span><strong>Email Address:</strong></span></div>
            <div className="col"><span>{email}</span></div>
          </div>
          <div className="row profile-row">
            <div className="col-3 text-right"><span><strong>Nickname:</strong></span></div>
            <div className="col"><span>{nickname}</span></div>
          </div>
          <div className="row profile-row">
            <div className="col-3 text-right"><span><strong>Communication:</strong></span></div>
            <div className="col"><span>{agreedToEmailMessage}</span></div>
          </div>
          <div className="row profile-row">
            <div className="col-3 text-right"><span><strong>OK to Publish:</strong></span></div>
            <div className="col"><span>{agreeToTermsOfAuthorMessage}</span></div>
          </div>
          <div className="row profile-row">
            <div className="col-3 text-right"><span><strong>Pen Name:</strong></span></div>
            <div className="col"><span>{penName}</span></div>
          </div>
          <div className="row profile-row">
            <div className="col-3">&nbsp;</div>
            <div className="col">
              <button className="btn btn-primary" type="button" onClick={this.onEdit} enabled={!edit}>
                <i className="icon ion-edit action-icon"></i> Change Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}