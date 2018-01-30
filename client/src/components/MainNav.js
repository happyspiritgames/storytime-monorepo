import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../util/authentication';

class MainNav extends Component {

  redirectHome = () => {
    const { history } = this.props;
    history.push('/library');
  }

  render() {
    const loggedIn = isLoggedIn();

    return (
      <Nav tabs justified className="reader-nav">
        <NavItem>
          <NavLink href="/">StoryTime</NavLink>
        </NavItem>
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
        <NavItem>
          <NavLink href="/admin">Game Admin</NavLink>
        </NavItem>
        <NavItem className="nav navbar-nav navbar-right">
          {
            ( loggedIn ) ? (
              <Button
                color="primary"
                className="log"
                onClick={() => logout(this.redirectHome)}
              >Sign Out</Button>
            ) : (
              <Button
                color="primary"
                className="log"
                onClick={() => login()}
              >Sign In</Button>
            )
          }
        </NavItem>
      </Nav>
    );
  }
}

export default withRouter(MainNav)
