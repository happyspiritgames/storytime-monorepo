import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import PlayerInfoCard from './PlayerInfoCard';
import { isLoggedIn } from '../../util/authentication';
import { getOwnProfile } from '../../services/storyTimeService';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerProfile: {}
    };
  }

  loadProfile = (profile) => {
    this.setState({ playerProfile: profile });
  }

  componentDidMount() {
    if (isLoggedIn()) {
      getOwnProfile(this.loadProfile);
    }
  }

  render() {
    return (isLoggedIn()) ? (
      <StoryTimePage id="account" heading="Player Profile">
        <PlayerInfoCard profile={this.state.playerProfile} />
      </StoryTimePage>
    ) : (
      <StoryTimePage id="account" heading="Who Are You?">
        <h3>Please sign in to see this information.</h3>
      </StoryTimePage>
    );
  }
}