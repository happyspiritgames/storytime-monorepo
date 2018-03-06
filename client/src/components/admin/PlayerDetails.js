import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody, CardFooter, Row, Col, Button } from 'reactstrap'
import { formatDateTime } from '../../util/formatter'

export default class PlayerDetails extends Component {
  static propTypes = {
    player: PropTypes.object,
    onStatusChange: PropTypes.shape({
      activate: PropTypes.func,
      suspend: PropTypes.func
    }),
    statusCodeLookup: PropTypes.func
  }

  handleSuspendPlayer = (playerId) => {
    return () => {
      this.props.onStatusChange.suspend(playerId);
    }
  }

  handleActivatePlayer = (playerId) => {
    return () => {
      this.props.onStatusChange.activate(playerId);
    }
  }

  render() {
    const { player, statusCodeLookup } = this.props
    if (player === undefined || player === {}) {
      return <p><strong>Select a player from the list above.</strong></p>
    }
    const joinedOnDisplayValue = formatDateTime(player.createdAt)
    let emailOptInDisplayValue = 'No'
    if (player.emailOptInAt) {
      emailOptInDisplayValue = `Yes, ${formatDateTime(player.emailOptInAt)}`
    }
    const playerStatusCode = statusCodeLookup(player.status)
    const statusToShow = (playerStatusCode) ? playerStatusCode.displayName : player.status
    return (
      <Card>
        <CardHeader>
          <h5 className="mb-0">Details</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col><strong>ID</strong></Col>
            <Col><span>{player.id}</span></Col>
          </Row>
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
            <Col><span>{joinedOnDisplayValue}</span></Col>
          </Row>
          <Row>
            <Col><strong>Email Opt-in</strong></Col>
            <Col><span>{emailOptInDisplayValue}</span></Col>
          </Row>
          <Row>
            <Col><strong>Status</strong></Col>
            <Col><span>{statusToShow}</span></Col>
          </Row>
        </CardBody>
        <CardFooter>
          { playerStatusCode && playerStatusCode.name === 'active' &&
            <Button color="warning"
              onClick={this.handleSuspendPlayer(player.id)}
            >
              Suspend
            </Button>
          }
          { playerStatusCode && playerStatusCode.name === 'suspended' &&
            <Button color="primary"
              onClick={this.handleActivatePlayer(player.id)}
            >
              Activate
            </Button>
          }
        </CardFooter>
      </Card>
    )
  }
}