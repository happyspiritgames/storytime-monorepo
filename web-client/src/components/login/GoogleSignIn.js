import React, { Component } from 'react';

export default class GoogleSignIn extends Component {

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('GoogleSignIn success', profile);
  }

  onFailure(error) {
    console.log('GoogleSignIn error', error);
  }

  componentDidMount() {
    window.gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
      'onfailure': this.onFailure
    });
  }

  render() {
    return (
      <div id="my-signin2"></div>
    );
  }
}
