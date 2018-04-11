import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter, Link } from 'react-router-dom'
import { login, logout, isLoggedIn } from '../../util/authentication'
import './navigation.css'

class Navigation extends Component {
  static propTypes = {
    roles: PropTypes.array,
    userLoggedOut: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    loadRoles: PropTypes.func
  }

  hasRole = (role) => {
    return this.props.roles && this.props.roles.includes(role)
  }

  handleLogin = () => {
    login()
  }

  handleLogout = () => {
    this.props.logout()
    logout(() => this.props.history.push('/'))
  }

  loadRolesIfMissing(roles) {
    if (isLoggedIn() && (!roles || !roles.length)) {
      this.props.loadRoles()
    }
  }

  componentDidMount() {
    this.loadRolesIfMissing(this.props.roles)
  }

  componentWillReceiveProps(newProps) {
    this.loadRolesIfMissing(newProps.roles)
  }

  componentDidCatch(error, info) {
    // TODO return a good default nav when things go to heck
    // for now, take a note when something goes wrong in the nav
    console.error(error)
  }

  render() {
    const isSignedIn = !this.props.userLoggedOut && isLoggedIn();
    const isAdmin = this.hasRole('admin')
    const isAuthor = this.hasRole('author')

    return (
      <nav className="navbar navbar-light navbar-expand-md navigation-clean">
        <Link className="navbar-brand" to="/">StoryTime</Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav ml-auto">
          {isSignedIn && isAuthor &&
            <li className="nav-item" role="presentation"><Link className="nav-link" to="/writingdesk">Writing Desk</Link></li>
          }
          {isSignedIn &&
              <li className="nav-item" role="presentation"><Link className="nav-link" to="/account">Account</Link></li>
          }
          {isSignedIn && isAdmin &&
              <li className="nav-item" role="presentation"><Link className="nav-link" to="/admin">Admin</Link></li>
          }
          {isSignedIn &&
              <li className="nav-item" role="presentation"><button onClick={this.handleLogout}>Sign Out</button></li>
          }
          {!isSignedIn &&
              <li className="nav-item" role="presentation"><button onClick={this.handleLogin}>Sign In</button></li>
          }
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navigation)
