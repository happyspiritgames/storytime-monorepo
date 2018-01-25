import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import PlayerInfoCard from './PlayerInfoCard';
import { isLoggedIn } from '../../util/authentication';
import { getProfile, updateProfile } from '../../services/storyTimeService';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerProfile: {
        email: '',
        nickname: '',
        membersOnlyComms: false,
        profilePicUrl: ''
      },
      playerProfileUpdate: {
        nickname: '',
        membersOnlyComms: false,
      }
    };
    // TODO make updates to parallel profile object
  }

  loadProfile = (profile) => {
    const update = {
      nickname: profile.nickname,
      membersOnlyComms: profile.membersOnlyComms
    };
    this.setState({ playerProfile: profile, playerProfileUpdate: update });
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    const updatedProfile = Object.assign({}, this.state.playerProfileUpdate, { [name]: value });
    this.setState({
      playerProfileUpdate: updatedProfile
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(this.state.playerProfileUpdate, this.loadProfile);
  }

  componentDidMount() {
    if (isLoggedIn()) {
      getProfile(this.loadProfile);
    }
  }

  render() {
    return (isLoggedIn()) ? (
      <StoryTimePage id="account" heading="Player Profile">
        <PlayerInfoCard
          profile={this.state.playerProfile}
          profileUpdate={this.state.playerProfileUpdate}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
      </StoryTimePage>
    ) : (
      <StoryTimePage id="account" heading="Who Are You?">
        <h3>Please sign in to see this information.</h3>
      </StoryTimePage>
    );
  }
}