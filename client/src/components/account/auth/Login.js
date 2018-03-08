import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

export const GOOGLE = 'google'
export const FACEBOOK = 'facebook'

export default class Login extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  handleGoogleLogin = (googleUser) => {
    const profile = googleUser.getBasicProfile()
    console.log('handleGoogleLogin success', googleUser)
    console.log('basic profile', profile)
    const memberProps = {
      email: profile.getEmail(),
      nickname: profile.getName(),
      membersOnlyComms: true,
      profilePicUrl: profile.getImageUrl()
    }
    this.setState({
      loggedInWith: GOOGLE,
      memberProps: memberProps
    })
  }

  handleGoogleLogout = (result) => {
    console.log('handleGoogleLogout', result)
    this.setState({
      loggedInWith: undefined,
      memberProps: {}
    })
  }

  handleGoogleFailure = (error) => {
    console.log('handleGoogleFailure error', error)
  }

  handleFacebookLogin = (result) => {
    console.log('Logged in with Facebook', result)
    const memberProps = {
      email: 'someone@somewhere.com',
      nickname: result.name,
      membersOnlyComms: true,
      profilePicUrl: undefined
    }
    this.setState({
      loggedInWith: FACEBOOK,
      memberProps: memberProps
    })
  }

  handleFacebookLogout = () => {
    console.log('Logged out with Facebook')
    this.setState({
      loggedInWith: undefined,
      memberProps: {}
    })
  }

  renderLoginButtons() {
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
        <a href="/auth/facebook">Login with Facebook</a>
      </div>
    )
  }

  renderLogoutButton() {
    return (
      <div>
        <button onClick={this.handleGoogleLogout}>Logout</button>
        <GoogleLogout />
      </div>
    )
  }

  render() {
    const { isLoggedIn } = this.props
    const buttons = isLoggedIn ? this.renderLogoutButton() : this.renderLoginButtons()

    return (
      <div id="login" heading="Who Are You?">
        {buttons}
      </div>
    )
  }
}