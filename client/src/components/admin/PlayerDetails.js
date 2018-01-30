import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Button } from 'reactstrap';

export default class PlayerDetails extends Component {
  static propTypes = {
    player: PropTypes.object
  };

  render() {
    const { player } = this.props;
    const emailOptIn = player.emailOptInAt ? `Yes ${player.emailOptInAt}` : 'No';
    if (player === undefined || player === {}) {
      return;
    }
    return (
      <Card>
        <CardHeader>
          <h5 className="mb-0">Player Details</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col><strong>Nickname</strong></Col>
            <Col><span>{player.nickname}</span></Col>
          </Row>
          <Row>
            <Col><strong>Email</strong></Col>
            <Col><span>{player.email}</span></Col>
          </Row>
          <Row>
            <Col><strong>Joined</strong></Col>
            <Col><span>{player.createdAt}</span></Col>
          </Row>
          <Row>
            <Col><strong>Email Opt-in</strong></Col>
            <Col><span>{emailOptIn}</span></Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Button color="warning">Suspend</Button>&nbsp;
          <Button color="primary">Resume</Button>&nbsp;
          <Button color="danger">Delete</Button>
        </CardFooter>
      </Card>
    );
  }
}