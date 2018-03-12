import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { setIdToken, setAccessToken } from '../../util/authentication'

class Callback extends Component {

  componentDidMount() {
    setAccessToken()
    setIdToken()
    // TODO get redirect location from props
    this.props.history.push('/')
  }

  render() {
    return null
  }
}

// make component route-aware
const CallbackWithRouter = withRouter(Callback)

export default CallbackWithRouter
