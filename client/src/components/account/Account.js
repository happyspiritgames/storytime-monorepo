import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import PlayerInfoCard from './PlayerInfoCard';
import { isLoggedIn, showUserInfo } from '../../util/authentication';
import { getSelfProfile, refreshProfile } from '../../services/storyTimeService';

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

  showProfile = (profile) => {
    console.log('social profile', process);
  }

  componentDidMount() {
    if (isLoggedIn()) {
      getSelfProfile(this.loadProfile);
      // refreshProfile(this.showProfile);
    }
  }

  render() {
    const userInfo = showUserInfo();
    console.log(userInfo);
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