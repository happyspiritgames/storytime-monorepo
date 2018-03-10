import React, { Component } from 'react'
import PropTypes from "prop-types";
import { withRouter, Link } from 'react-router-dom'
import { login, logout, isLoggedIn } from '../../util/authentication'
import './navigation.css'

class Navigation extends Component {
  static propTypes = {
    roles: PropTypes.array,
    reloadRoles: PropTypes.func
  }

  state = {
    roles: []
  }

  handleLogin = () => {
    login()
  }

  handleLogout = () => {
    logout(() => this.props.history.push('/'))
  }

  hasRole = (roleInQuestion) => {
    return this.state.roles.includes(roleInQuestion)
  }

  componentDidMount() {
    if (this.props.roles && this.props.roles.length) {
      this.setState({
        roles: this.props.roles
      })
    } else {
      if (this.props.reloadRoles) {
        this.props.reloadRoles()
        console.log('roles are missing; try reloading')
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roles && nextProps.roles !== this.state.roles) {
      // note when roles go away -- might be legit, might be Redux state refresh
      if (!nextProps.roles.length && isLoggedIn()) {
        console.warn('Still logged in, but player roles disappeared. Used to be', this.state.roles)
      }
      this.setState({
        roles: nextProps.roles
      })
    }
  }

  componentDidCatch(error, info) {
    // TODO return a good default nav when things go to heck
    // for now, take a note when something goes wrong in the nav
    console.error(error)
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const isSignedIn = isLoggedIn();
    const hasAdminRole = this.hasRole('admin');
    const hasAuthorRole = this.hasRole('author');
    return (
      <nav className="navbar navbar-light navbar-expand-md navigation-clean">
        <Link className="navbar-brand" to="/">StoryTime</Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="nav navbar-nav ml-auto">
          {isSignedIn && hasAuthorRole &&
            <li className="nav-item" role="presentation"><Link className="nav-link" to="/writingdesk">Writing Desk</Link></li>
          }
          {isSignedIn &&
              <li className="nav-item" role="presentation"><Link className="nav-link" to="/account">Account</Link></li>
          }
          {isSignedIn && hasAdminRole &&
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
