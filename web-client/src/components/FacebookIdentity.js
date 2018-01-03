import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Deals with Facebook authentication.
 *
 * Permissions to request: email, public_profile, user_friends (see who else uses the app)
 */
export default class FacebookIdentity extends Component {
  static propTypes = {
    continueAs: PropTypes.bool,
    showFaces: PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      authStatus: {
        status: 'unknown',
        authResponse: {}
      }
    };
  }

  static checkLoginState() {
    console.log('called checkLoginState');
  }

  render() {
    const { showFaces } = this.props;
    return (
      <div>
        <div id="fbLoginStatus"></div>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-scope="email,public_profile"
          data-size="large"
          data-button-type="login_with"
          data-show-faces={showFaces}
          data-auto-logout-link="true"
          data-onlogin="checkLoginState();"
        ></div>
      </div>
    )
  }
}