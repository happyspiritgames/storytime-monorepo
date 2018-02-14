import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation';
import Footer from './footer';

export default class StoryTimePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render() {
    const { id, children } = this.props;
    return (
      <div id={id} className="container-fluid">
        <Navigation />
        {children}
        <Footer />
      </div>
    );
  }
}