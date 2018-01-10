import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

export default class MemberInfoCard extends Component {
  static propTypes = {
    email: PropTypes.string,
    nickname: PropTypes.string,
    membersOnlyComms: PropTypes.bool
  };

  render() {
    const { email, nickname, membersOnlyComms } = this.props;
    const membersOnlyCommsDescription = membersOnlyComms
      ? 'Yes, you want members-only communications.'
      : 'No, you do not want members-only communications';

    return (
      <Card id="member-info" outline color="info">
        <CardHeader>
          <h3 className="mb-0">Member Information</h3>
        </CardHeader>
        <CardBody>
            <CardText><strong>Email address:</strong> {email}</CardText>
            <CardText><strong>Nickname:</strong> {nickname}</CardText>
            <CardText><strong>Communication preferences:</strong>
              <ul>
                <li>{membersOnlyCommsDescription}</li>
              </ul>
            </CardText>
        </CardBody>
      </Card>
    );
  }
}