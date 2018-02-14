import React, { Component } from 'react';
import './navigation.css';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-light navbar-expand-md navigation-clean">
        <div className="container">
          <a className="navbar-brand" href="/">StoryTime</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item" role="presentation"><a className="nav-link" href="/writingdesk">Writing Desk</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/account">Account</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/admin">Admin</a></li>
              <li className="nav-item" role="presentation"><a className="nav-link" href="/signin">Sign In</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}