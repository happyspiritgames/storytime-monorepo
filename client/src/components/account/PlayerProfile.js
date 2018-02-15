import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { playerProfileShape } from '../../services/dataShapes';
import { formatDate } from '../../util/formatter';

export default class PlayerProfile extends Component {
  static propTypes = {
    profile: playerProfileShape,
    edit: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      editMode: false
    };
  }

  onEdit = () => {
    this.setState({
      editMode: true
    });
  }

  onSave = () => {
    this.setState({
      editMode: false
    });
  }

  renderProfileForView(profile) {
    const { email, nickname, agreedToEmailOn, agreedToTermsOfAuthorOn, penName } = profile;
    const agreedToEmailMessage = (agreedToEmailOn)
      ? `Yes, agreed to email on ${formatDate(agreedToEmailOn)}`
      : 'No, I do not want to receive email from Happy Spirit Games.';
    const agreeToTermsOfAuthorMessage = (agreedToTermsOfAuthorOn)
      ? `Yes, agreed to terms on ${formatDate(agreedToTermsOfAuthorOn)}`
      : 'No. Agree to terms and conditions for authors (below) to gain access.';

    return (
      <div>
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
              <button className="btn btn-primary" type="button" onClick={this.onEdit}>
                <i className="icon ion-edit action-icon"></i> Change Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderProfileForEdit(profile) {
    const { nickname, agreedToEmailOn, agreedToTermsOfAuthorOn, penName } = profile;

    return (
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
          <input className="form-check-input" type="checkbox" id="formCheck-1" />
          <label className="form-check-label" for="formCheck-1">Check to agree to receive email from Happy Spirit Games</label>
        </div>
        <button className="btn btn-primary action-button" type="button" onClick={this.onSave}>Save Changes</button>
      </form>
    );
  }

  render() {
    const { profile } = this.props;
    const { editMode } = this.state;
    const profileContent = (editMode) ? this.renderProfileForEdit(profile) : this.renderProfileForView(profile);

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Player Profile</h4>
          <h6 className="text-muted card-subtitle mb-2 text-center">Let us know about you as a player.</h6>
        </div>
        {profileContent}
      </div>
    );
  }
}