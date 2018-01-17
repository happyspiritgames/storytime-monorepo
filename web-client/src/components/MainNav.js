import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class MainNav extends Component {
  render() {
    return (
      <Nav tabs justified className="reader-nav">
        <NavItem>
          <NavLink href="/library">Find Stories</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/account">Player Settings</NavLink>
        </NavItem>
        <NavItem className="nav navbar-nav navbar-right">
          <button className="btn btn-info log">Log In</button>
        </NavItem>
        <NavItem className="nav navbar-nav navbar-right">
          <button className="btn btn-danger log">Log Out</button>
        </NavItem>
      </Nav>
    );
  }
}