import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';

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

  constructor() {
    super();
    this.state = {
      editMode: false
    };
  }

  handleSubmit = (event) => {
    this.setState({
      editMode: false
    });
    this.props.onSubmit(event);
  }

  handleEdit = () => {
    this.setState({
      editMode: true
    })
  }

  handleCancel = () => {
    this.setState({
      editMode: false
    })
  }

  renderNicknameField() {
    if (this.state.editMode) {
      return (
        <input
          name="nickname"
          type="text"
          value={this.props.profileUpdate.nickname}
          onChange={this.props.onChange}
        />
      );
    } else {
      return this.props.profile.nickname;
    }
  }

  renderEmailOptIn() {
    if (this.state.editMode) {
      const emailOptInUpdate = this.props.profileUpdate.membersOnlyComms;
      const label = (emailOptInUpdate)
        ? 'Yes, keep me informed by email.'
        : 'No, I prefer not to get email.';
      return (
        <span>
          <input
            name="membersOnlyComms"
            type="checkbox"
            checked={emailOptInUpdate}
            onChange={this.props.onChange}
          /> {label
        }</span>
      )
    } else {
      return (this.props.profile.membersOnlyComms)
      ? 'Yes, keep me informed by email.'
      : 'No, I prefer not to get email.';
    }
  }

  renderButtons() {
    if (this.state.editMode) {
      return (
        <span>
          <Button className="btn btn-info" onClick={this.handleSubmit}>
            Save Changes
          </Button> <Button className="btn btn-danger" onClick={this.handleCancel}>Cancel</Button>
        </span>
      )
    } else {
      return (
        <span>
          <Button onClick={this.handleEdit}>Change Profile</Button>
        </span>
      )
    }
  }

  render() {
    const { email } = this.props.profile;

    return (
      <div id="member-info">
        <h3>Your Player Profile</h3>
        <Row>
          <Col sm="3"><strong>Email address:</strong></Col>
          <Col>{email}</Col>
        </Row>
        <Row>
          <Col sm="3"><strong>Nickname:</strong></Col>
          <Col>{this.renderNicknameField()}</Col>
        </Row>
        <Row>
          <Col sm="3"><strong>Preferences:</strong></Col>
          <Col>{this.renderEmailOptIn()}</Col>
        </Row>
        <Row>
          <Col sm="3"></Col>
          <Col>{this.renderButtons()}</Col>
        </Row>
      </div>
    );
  }
}
