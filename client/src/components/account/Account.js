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
      }
    };
  }

  loadProfile = (profile) => {
    this.setState({ playerProfile: profile });
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    const updatedProfile = Object.assign({}, this.state.playerProfile, { [name]: value });
    this.setState({
      playerProfile: updatedProfile
    });
    console.log(this.state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(this.state.playerProfile, this.loadProfile);
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