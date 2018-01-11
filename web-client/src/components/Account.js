import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import MemberInfoCard from './MemberInfoCard';

const GOOGLE = 'google';
const FACEBOOK = 'facebook';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberProps: {}
    };
  }

  isLoggedInWithGoogle = () => {
    return this.state.loggedInWith === GOOGLE;
  }

  isLoggedInWithFacebook = () => {
    return this.state.loggedInWith === FACEBOOK;
  }

  isLoggedIn = () => {
    return this.isLoggedInWithFacebook() || this.isLoggedInWithGoogle();
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
      loggedInWith: GOOGLE,
      memberProps: memberProps
    })
  }

  handleGoogleLogout = (result) => {
    console.log('handleGoogleLogout', result);
    this.setState({
      loggedInWith: undefined,
      memberProps: {}
    });
  }

  handleGoogleFailure = (error) => {
    console.log('handleGoogleFailure error', error);
  }

  handleFacebookLogin = (result) => {
    console.log('Logged in with Facebook', result);
    const memberProps = {
      email: 'someone@somewhere.com',
      nickname: result.name,
      membersOnlyComms: true,
      profilePicUrl: undefined
    };
    this.setState({
      loggedInWith: FACEBOOK,
      memberProps: memberProps
    })
  }

  handleFacebookLogout = () => {
    console.log('Logged out with Facebook');
    this.setState({
      loggedInWith: undefined,
      memberProps: {}
    });
  }

  renderAuthButtons() {
    if (this.isLoggedInWithGoogle()) {
      return (
        <GoogleLogout
          buttonText="Logout of Google"
          onLogoutSuccess={this.handleGoogleLogout}
        />
      );
    } else if (this.isLoggedInWithFacebook()) {
      return <button onClick={this.handleFacebookLogout}>Logout of Facebook</button>;
    } else {
      return (
        <div>
          <GoogleLogin
            clientId="611755432334-tpl4ejet5kubkn6tcch7ci0ogigajtg8.apps.googleusercontent.com"
            buttonText="Login w/Google"
            onSuccess={this.handleGoogleLogin}
            onFailure={this.handleGoogleFailure}
          />
          <FacebookLogin
            appId="871780702991547"
            version="2.11"
            callback={this.handleFacebookLogin}
          />
        </div>
      );
    }
  }

  render() {
    const loggedIn = this.isLoggedIn();
    const pageHeading = loggedIn ? 'All About You' : 'Who Are You?';
    const memberInfo = !loggedIn ? undefined :
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