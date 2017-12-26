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
      <Nav pills>
        <NavItem>{ title }</NavItem>
        <NavItem>
          <NavLink href="/library">Library</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#back">Go Back</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#bookmark">Bookmark</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#share">Share</NavLink>
        </NavItem>
      </Nav>
    );
  }
}