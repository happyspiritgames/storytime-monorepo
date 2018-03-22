import React, { Component } from 'react'

export default class Contact extends Component {
  state = {
    name: '',
    message: ''
  }

  handleChange = (event) => {
    const { id, value } = event.target
    this.setState({
      [id]: value
    })
  }

  openMailToSend = (event) => {
    event.preventDefault()
    const toAddress = 'welcome@happyspiritgames.com'
    const subject = 'StoryTime%20Feedback'
    const message = `Name: ${this.state.name}\n\nMessage:\n${this.state.message}`
    const body = encodeURI(message)
    window.open(`mailto:${toAddress}?subject=${subject}&body=${body}`)
  }

  render() {
    const { name, message } = this.state
    return (
      <div id="contact">
        <div style={{color: 'purple', textAlign: 'center'}}>
          <h1>Thanks for playing StoryTime.</h1>
        </div>
        <form method="post">
          <h2 className="text-center">Contact us</h2>
          <p className="text-center"><em>Note: Your message will be delivered using your default email client. That's just how it works for now.</em></p>
          <p className="text-center"><em>Thanks for sharing your thoughts.</em></p>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="14"
              id="message"
              placeholder="Your message"
              value={message}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary" type="submit" onClick={this.openMailToSend}>Send to Happy Spirit Games</button>
          </div>
        </form>
      </div>
    )
  }
}
