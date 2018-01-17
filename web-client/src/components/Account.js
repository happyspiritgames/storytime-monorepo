import React, { Component } from 'react';
import StoryTimePage from './StoryTimePage';
import MemberInfoCard from './MemberInfoCard';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerProfile: {}
    };
  }

  componentDidMount() {
    this.setState({
      playerProfile: {
        email: 'bubba@happyspiritgames.com',
        nickname: 'Bubba',
        membersOnlyComms: true,
        profilePicUrl: 'http://localhost:3000/blargy.png'
      }
    })
  }

  render() {
    const { profile } = this.state.playerProfile;
    return (
      <StoryTimePage id="account" heading="Player Profile">
        <MemberInfoCard {...profile} />
      </StoryTimePage>
    );
  }
}