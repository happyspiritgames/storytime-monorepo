import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Row, Col } from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import FacebookIdentity from './FacebookIdentity';

export default class SettingsCard extends Component {
  handleFacebookResponse = (response) => {
    console.log(response);
  }

  render() {
    return (
      <Card id="scene" outline color="info">
        <CardHeader className="text-center">
          <h5 className="mb-0">About You</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FacebookIdentity showFaces={true} continueAs={true} />
            </Col>
            <Col>
              <p><em>(only shown when logged in)</em></p>
              <div><strong>Member since:</strong> July 4, 2017</div>
              <div><strong>Pen Names:</strong> The Happy Spirit, Bubba</div>
              <div><strong>Status:</strong> Excellent</div>
            </Col>
          </Row>
          <Row>
            <Col span="2">
              <FacebookLogin
                appId="871780702991547"
                callback={this.handleFacebookResponse}
              />
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          WIP
        </CardFooter>
      </Card>
    );
  }
}