import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SettingsCard from './SettingsCard';

export default class Account extends Component {

  render() {
    return (
      <Container id="library" fluid={true} className="storytime-page">
        <h1 className="text-center">Happy Spirit Games Membership</h1>
        <SettingsCard />
      </Container>
    );
  }
}