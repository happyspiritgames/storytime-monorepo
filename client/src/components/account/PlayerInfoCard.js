import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

export default class PlayerInfoCard extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      email: PropTypes.string,
      nickname: PropTypes.string,
      membersOnlyComms: PropTypes.bool,
      profilePicUrl: PropTypes.string
    })
  };

  render() {
    const { email, nickname, membersOnlyComms, profilePicUrl } = this.props.profile;
    const membersOnlyCommsDescription = membersOnlyComms
      ? 'Yes, you want members-only communications.'
      : 'No, you do not want members-only communications';

    return (
      <div id="member-info">
        <h3>Member Information</h3>
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
      </div>
    );
  }
}
