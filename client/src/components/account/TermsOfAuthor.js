import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../util/formatter'

export default class TermsOfAuthor extends Component {
  static propTypes = {
    agreedOn: PropTypes.string
  }

  render() {
    const { agreedOn } = this.props;
    const agreementPrompt = (agreedOn)
      ? <h4 className="text-center">You agreed to these terms on {formatDate(agreedOn)}.</h4>
      : <button className="btn btn-primary action-button" type="button">I Agree</button>

    // TODO put checkbox next to each term; people need to check all for button to be enabled

    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Terms and Conditions for Authors</h4>
          <h6 className="text-muted card-subtitle mb-2 text-center">Want to write and publish your own stories? &nbsp;Agree to the terms and conditions below to gain access to the StoryTime Writing Desk.</h6>
          <ul className="list-group terms">
            <li className="list-group-item"><span>Plagerism is not allowed. Do not copy works owned by others.</span></li>
            <li className="list-group-item"><span>As an author, you grant Happy Spirit Games unrestricted rights to distribute your work within the StoryTime game world.</span></li>
            <li className="list-group-item"><span>StoryTime may not be used for illegal activities of any kind.</span></li>
            <li className="list-group-item"><span>Happy Spirit Games maintains the right to censor inappropriate material. Your worked will be reviewed as part of the publishing process, and you will be asked to correct anything that is particularly offensive or distasteful.</span></li>
            <li className="list-group-item"><span>Play at your own risk. Be careful about the information you share with others.</span></li>
            <li className="list-group-item"><span>Happy Spirit Games makes no claims about the suitability of StoryTime for any purpose other than providing an opportunity to have fun.&nbsp;</span></li>
          </ul>
          {agreementPrompt}
        </div>
      </div>
    )
  }
}