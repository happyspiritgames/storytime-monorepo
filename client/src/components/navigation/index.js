import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { login, logout, isLoggedIn, hasRole } from '../../util/authentication'
import './navigation.css'

class Navigation extends Component {

  redirectHome = () => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    const isSignedIn = isLoggedIn();
    const hasAdminRole = hasRole('admin');
    const hasAuthorRole = hasRole('author');
    const doSignIn = () => login();
    const doSignOut = () => logout(this.redirectHome);

    return (
      <nav className="navbar navbar-light navbar-expand-md navigation-clean">
        <Link className="navbar-brand" to="/">StoryTime</Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav ml-auto">
          {
            (isSignedIn && hasAuthorRole) ? (
              <li className="nav-item" role="presentation"><Link className="nav-link" to="/writingdesk">Writing Desk</Link></li>
            ) : ''
          }
          {
            (isSignedIn) ? (
              <li className="nav-item" role="presentation"><Link className="nav-link" to="/account">Account</Link></li>
            ) : ''
          }
          {
            (isSignedIn && hasAdminRole) ? (
              <li className="nav-item" role="presentation"><Link className="nav-link" to="/admin">Admin</Link></li>
            ) : ''
          }
          {
            (isSignedIn) ? (
              <li className="nav-item" role="presentation"><a className="nav-link" onClick={doSignOut}>Sign Out</a></li>
            ) : (
              <li className="nav-item" role="presentation"><a className="nav-link" onClick={doSignIn}>Sign In</a></li>
            )
          }
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navigation)
