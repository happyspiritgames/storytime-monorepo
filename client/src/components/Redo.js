import React, { Component } from 'react';
import Navigation from './navigation';
import Footer from './footer';
import Library from './library';

export default class Redo extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navigation />
        <Library />
        <Footer />
      </div>
    );
  }
}