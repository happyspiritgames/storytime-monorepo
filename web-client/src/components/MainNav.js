import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { login, logout, isLoggedIn } from '../services/authService';

export default class MainNav extends Component {

  render() {
    const loggedIn = isLoggedIn();

    return (
      <Nav tabs justified className="reader-nav">
        <NavItem>
          <NavLink href="/library">Find Stories</NavLink>
        </NavItem>
        {
          ( loggedIn ) ? (
            <NavItem>
              <NavLink href="/account">Player Settings</NavLink>
            </NavItem>
          ) : ''
        }
        <NavItem className="nav navbar-nav navbar-right">
          {
            ( loggedIn ) ? (
              <button
                className="btn btn-danger log"
                onClick={() => logout()}
              >Sign Out</button>
            ) : (
              <button
                className="btn btn-info log"
                onClick={() => login()}
              >Sign In</button>
            )
          }
        </NavItem>
      </Nav>
    );
  }
}