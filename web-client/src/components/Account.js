import React, { Component } from 'react';
import StoryTimePage from './StoryTimePage';
import MemberInfoCard from './MemberInfoCard';
import { isLoggedIn } from '../services/authService';
import { getOwnProfile } from '../services/storyTimeService';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerProfile: {}
    };
  }

  loadProfile(profile) {
    this.setState({ playerProfile: profile });
  }

  componentDidMount() {
    getOwnProfile(this.loadProfile);
  }

  render() {
    const { profile } = this.state.playerProfile;
    return (isLoggedIn()) ? (
      <StoryTimePage id="account" heading="Player Profile">
        <MemberInfoCard {...profile} />
      </StoryTimePage>
    ) : (
      <StoryTimePage id="account" heading="Who Are You?">
        <h3>Please sign in to see this information.</h3>
      </StoryTimePage>
    );
  }
}