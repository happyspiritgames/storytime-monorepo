import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Deals with Facebook authentication.
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

  render() {
    const { continueAs, showFaces } = this.props;
    return (
      <div
        className="fb-login-button"
        data-width="200px"
        data-max-rows="1"
        data-size="large"
        data-button-type="login_with"
        data-show-faces={showFaces}
        data-auto-logout-link="true"
        data-use-continue-as={continueAs}>
      </div>
    )
  }
}