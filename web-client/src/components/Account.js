import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import MemberInfoCard from './MemberInfoCard';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      memberProps: {}
    };
  }

  handleGoogleLogin = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log('handleGoogleLogin success', googleUser);
    console.log('basic profile', profile);
    const memberProps = {
      email: profile.getEmail(),
      nickname: profile.getName(),
      membersOnlyComms: true,
      profilePicUrl: profile.getImageUrl()
    };
    this.setState({
      isLoggedIn: true,
      memberProps: memberProps
    })
  }

  handleGoogleLogout = (result) => {
    console.log('handleGoogleLogout', result);
    this.setState({
      isLoggedIn: false
    });
  }

  handleGoogleFailure = (error) => {
    console.log('handleGoogleFailure error', error);
  }

  renderAuthButtons() {
    if (this.state.isLoggedIn) {
      return (
        <GoogleLogout
          buttonText="Logout of Google"
          onLogoutSuccess={this.handleGoogleLogout}
        />
      );
    } else {
      return (
        <GoogleLogin
          clientId="611755432334-tpl4ejet5kubkn6tcch7ci0ogigajtg8.apps.googleusercontent.com"
          buttonText="Login w/Google"
          onSuccess={this.handleGoogleLogin}
          onFailure={this.handleGoogleFailure}
        />
      );
    }
  }

  render() {
    const pageHeading = (this.state.isLoggedIn) ? 'All About You' : 'Who Are You?';
    const memberInfo = (!this.state.isLoggedIn) ? undefined :
      <MemberInfoCard {...this.state.memberProps}/>;

    return (
      <Container id="account" fluid={true} className="storytime-page">
        <h1 className="text-center">{pageHeading}</h1>
        {this.renderAuthButtons()}
        {memberInfo}
      </Container>
    );
  }
}