import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import FacebookIdentity from './FacebookIdentity';

export default class SettingsCard extends Component {
  handleLoginResponse = (response) => {
    console.log(response);
  }

  render() {
    return (
      <Card id="scene" outline color="info">
        <CardHeader className="text-center">
          <h5 className="mb-0">Identity</h5>
        </CardHeader>
        <CardBody>
          <FacebookLogin
            appId="871780702991547"
            autoLoad={true}
            field="name,email,picture"
            callback={this.handleLoginResponse}
            cssClass="my-facebook-button-class"
            icon="fa-facebook"
          />
          <FacebookIdentity showFaces={true} continueAs={true} />
        </CardBody>
        <CardFooter>
          WIP
        </CardFooter>
      </Card>
    );
  }
}