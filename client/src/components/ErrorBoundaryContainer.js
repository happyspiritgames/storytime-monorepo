import React, { Component } from 'react'

class ErrorBoundaryContainer extends Component {

  state = {}

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    // TODO send error report to support @ HappySpiritGames
  }

  renderErrorPage = () => {
    return (
      <div>
        <h1>OMG. You won't believe this...</h1>
        <p>You just ran into an unexpected problem. Sorry about that.
          It's probably our fault, or maybe the game server is down. Stuff
          happens, so don't feel too bad about it.</p>
        <p>You might want to <a href="/contact">let us know</a>.
          Someday we will tell ourselves automagically.</p>
      </div>
    )
  }

  render() {
    if (this.state.error) {
      console.log('caught an error', '\nerror=>', this.state.error)
      return this.renderErrorPage()
    }
    return this.props.children
  }
}

export default ErrorBoundaryContainer
