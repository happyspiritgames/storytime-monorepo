import React, { Component } from 'react';
import StoryTimePage from '../StoryTimePage';
import PlayerInfoCard from './PlayerInfoCard';
import { isLoggedIn, showUserInfo } from '../../util/authentication';
import { getSelfProfile } from '../../services/storyTimeService';

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
      getSelfProfile(this.loadProfile);
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