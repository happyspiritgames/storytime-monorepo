import React, { Component } from 'react';
import { Container } from 'reactstrap';
import GoogleSignIn from './login/GoogleSignIn';
import MemberInfoCard from './MemberInfoCard';

const memberProps = {
  email: 'bubba@happyspiritgames.com',
  nickname: 'Bubba',
  membersOnlyComms: true
};

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    let pageHeading;
    let loginButtons;
    let memberInfo;

    if (this.state.isLoggedIn) {
      pageHeading = 'All About You';
      memberInfo = <MemberInfoCard {...memberProps}/>;
    } else {
      pageHeading = 'Who Are You?';
      loginButtons = <GoogleSignIn />;
    }

    return (
      <Container id="account" fluid={true} className="storytime-page">
        <h1 className="text-center">{pageHeading}</h1>
        {loginButtons}
        {memberInfo}
      </Container>
    );
  }
}