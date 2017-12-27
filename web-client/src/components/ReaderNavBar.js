import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class ReaderNavBar extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    const { title } = this.props;
    return (
      <Nav tabs justified className="reader-nav">
        <NavItem>
          <NavLink active>{title}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/library">Return to Library</NavLink>
        </NavItem>
      </Nav>
    );
  }
}