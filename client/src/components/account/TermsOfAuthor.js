import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TermsOfAuthor extends Component {
  static propTypes = {
    onAgree: PropTypes.func,
    onCancel: PropTypes.func,
    readOnly: PropTypes.bool
  }

  render() {
    const { onAgree, onCancel, readOnly } = this.props;

    // TODO put checkbox next to each term; people need to check all for button to be enabled

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Terms and Conditions for Authors</h4>
          <h6 className="text-muted card-subtitle mb-2 text-center">Want to write and publish your own stories? &nbsp;Agree to the terms and conditions below to gain access to the StoryTime Writing Desk.</h6>
          <ul className="list-group terms">
            <li className="list-group-item"><span><i className="icon ion-checkmark"></i> You retain your copyright on original work. Your work belongs to you.</span></li>
            <li className="list-group-item"><span><i className="icon ion-checkmark"></i> You grant Happy Spirit Games permission to distribute your work.</span></li>
            <li className="list-group-item"><span><i className="icon ion-checkmark"></i> No plagerism. Do not copy material owned by others.</span></li>
            <li className="list-group-item"><span><i className="icon ion-checkmark"></i> Happy Spirit Games has the right to block inappropriate material as determined by Happy Spirit Games.</span></li>
            <li className="list-group-item"><span><i className="icon ion-checkmark"></i> StoryTime may not be used for illegal activities.</span></li>
            <li className="list-group-item"><span><i className="icon ion-checkmark"></i> We hope you enjoy StoryTime. If not, life offers many alternatives.</span></li>
          </ul>
        { !readOnly &&
          <div className="btn-group center" role="group">
            <button className="btn btn-primary" type="button" onClick={onAgree}>
              <i class="icon ion-checkmark"></i>&nbsp;I Agree
            </button>
            <button className="btn btn-warning" type="button" onClick={onCancel}>
              <i className="icon ion-close"></i>&nbsp;No Thanks
            </button>
          </div>
        }
        </div>
      </div>
    )
  }
}