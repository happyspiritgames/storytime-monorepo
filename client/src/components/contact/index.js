import React, { Component } from 'react'

export default class Contact extends Component {
  render() {
    return (
      <div id="contact">
        <div style={{color: 'purple', textAlign: 'center'}}>
          <h1>Thanks for playing StoryTime.</h1>
          <h3><i>This feedback form is not hooked up yet.</i></h3>
          <h3>You can <a href="mailto:welcome@happyspiritgames.com?Subject=Contact%20Feedback">send email if you like.</a></h3>
        </div>
        <form method="post">
          <h2 className="text-center">Contact us</h2>
          <div className="alert alert-warning" role="alert">
            <span><strong>Sign in</strong>&nbsp;if you would like a response.</span>
          </div>
          <div className="form-group">
            <input className="form-control" type="text" name="name" placeholder="Your name" />
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="14" name="message" placeholder="Your message"></textarea>
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary" type="submit">Send to Happy Spirit Games</button>
          </div>
        </form>
      </div>
    )
  }
}
