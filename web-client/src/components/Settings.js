import React, { Component } from 'react';
import { Container } from 'reactstrap';
import FacebookLogin from 'react-facebook-login';

export default class Settings extends Component {
  handleLoginResponse = (response) => {
    console.log(response);
  }

  render() {
    return (
      <Container id="settings" fluid={true} className="storytime-page">
        <FacebookLogin
          appId="871780702991547"
          autoLoad={true}
          field="name,email,picture"
          callback={this.handleLoginResponse}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
        <div
          className="fb-login-button"
          data-width="200px"
          data-max-rows="1"
          data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="true">
        </div>
      </Container>
    );
  }
}