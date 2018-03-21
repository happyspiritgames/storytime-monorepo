import { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loggedIn, loadRoles } from '../../datastore/actions'
import { setIdToken, setAccessToken, getIdToken, getAccessToken } from '../../util/authentication'

class Callback extends Component {
  static propTypes = {
    roles: PropTypes.array,
    stashAuthTokens: PropTypes.func,
    loadRoles: PropTypes.func
  }

  componentDidMount() {
    console.log('LoginCallback.componentDidMount')
    setAccessToken()
    setIdToken()
    this.props.stashAuthTokens(getIdToken(), getAccessToken())
    this.props.loadRoles()
    this.props.history.push('/')
  }

  render() {
    return null
  }
}

// make component route-aware
const CallbackWithRouter = withRouter(Callback)

const mapStateToProps = (state) => {
  return {
    roles: state.player.roles
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    loadRoles: () => dispatch(loadRoles()),
    stashAuthTokens: (idToken, accessToken) => dispatch(loggedIn(idToken, accessToken))
  }
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProp
)(CallbackWithRouter)

export default ConnectedNavigation
