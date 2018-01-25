import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default class PlayerInfoCard extends Component {
  static profileShape = PropTypes.shape({
    email: PropTypes.string,
    nickname: PropTypes.string,
    membersOnlyComms: PropTypes.bool,
    profilePicUrl: PropTypes.string,
  });
  static propTypes = {
    profile: PlayerInfoCard.profileShape,
    profileUpdate: PlayerInfoCard.profileShape,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  };

  render() {
    const { email, nickname, membersOnlyComms, profilePicUrl } = this.props.profile;
    const profileUpdate = this.props.profileUpdate;

    const { onChange, onSubmit } = this.props;
    const membersOnlyCommsDescription = membersOnlyComms
      ? 'Yes, you want members-only communications.'
      : 'No, you do not want members-only communications';

    return (
      <div id="member-info">
        <h3>Your Player Profile</h3>
        <Row>
          <Col sm="3"><strong>Email address:</strong></Col>
          <Col>{email}</Col>
        </Row>
        <Row>
          <Col sm="3"><strong>Nickname:</strong></Col>
          <Col>{nickname}</Col>
        </Row>
        <Row>
          <Col sm="3"><strong>Preferences:</strong></Col>
          <Col>{membersOnlyCommsDescription}</Col>
        </Row>
        <Row>
          <Col sm="3"><strong>Your Profile Picture:</strong></Col>
          <Col><img src={profilePicUrl} alt={nickname} /></Col>
        </Row>

        <h3>Make Changes</h3>
        <form onSubmit={onSubmit}>
        <Row>
          <Col sm="3"><strong>Nickname:</strong></Col>
          <Col>
            <input
              name="nickname"
              type="text"
              value={profileUpdate.nickname}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="3"></Col>
          <Col>
            <label>
              <input
                name="membersOnlyComms"
                type="checkbox"
                checked={profileUpdate.membersOnlyComms}
                onChange={onChange}
              />
              { profileUpdate.membersOnlyComms
                  ? 'Yes, keep me informed by email.'
                  : 'No, I prefer not to get email.' }
            </label>
          </Col>
        </Row>
        <Row>
          <Col sm="3"></Col>
          <Col sm="12" span="2"><button className="btn btn-default" type="submit">Save Changes</button></Col>
        </Row>
        </form>
      </div>
    );
  }
}
