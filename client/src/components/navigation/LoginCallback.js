import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setIdToken, setAccessToken } from '../../util/authentication'
import { loadRoles } from '../../datastore/actions'

class Callback extends Component {
  static propTypes = {
    doLoadRoles: PropTypes.func
  }

  componentDidMount() {
    setAccessToken()
    setIdToken()
    this.props.doLoadRoles()
    // TODO get redirect location from props
    this.props.history.push('/')
    // window.location.href = '/'
  }

  render() {
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    doLoadRoles: () => dispatch(loadRoles)
  }
}

// make component route-aware
const CallbackWithRouter = withRouter(Callback)

// hook up to redux store
const LoginCallback = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallbackWithRouter)

export default LoginCallback
