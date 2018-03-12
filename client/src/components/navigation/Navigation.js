import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter, Link } from 'react-router-dom'
import { login, logout, isLoggedIn } from '../../util/authentication'
import './navigation.css'

class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isAuthor: PropTypes.bool,
    doLogin: PropTypes.func,
    doLogout: PropTypes.func,
    doLoadRoles: PropTypes.func,
  }

  handleLogin = () => {
    login()
  }

  handleLogout = () => {
    this.props.doLogout()
    logout(() => this.props.history.push('/'))
  }

  componentDidMount() {
    if (isLoggedIn()) {
      this.props.doLogin()
      this.props.doLoadRoles()
    } else {
      this.props.doLogout()
    }
  }

  componentDidCatch(error, info) {
    // TODO return a good default nav when things go to heck
    // for now, take a note when something goes wrong in the nav
    console.error(error)
  }

  render() {
    const isSignedIn = this.props.isLoggedIn;
    const isAdmin = this.props.isAdmin
    const isAuthor = this.props.isAuthor

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
              <li className="nav-item" role="presentation"><a className="nav-link" onClick={this.handleLogout}>Sign Out</a></li>
          }
          {!isSignedIn &&
              <li className="nav-item" role="presentation"><a className="nav-link" onClick={this.handleLogin}>Sign In</a></li>
          }
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navigation)
