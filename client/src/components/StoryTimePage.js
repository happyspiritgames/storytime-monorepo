import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import MainNav from './MainNav';

export default class StoryTimePage extends Component {
  static propTypes = {
    id: PropTypes.string,
    heading: PropTypes.string
  }

  render() {
    const { id, heading, children } = this.props;

    return (
      <Container id={id} fluid={true} className="storytime-page">
        <MainNav />
        <h1 className="text-center">{heading}</h1>
        {children}
      </Container>
    );
  }
}