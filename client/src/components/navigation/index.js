import { connect } from 'react-redux'
import { login, logout, loadRoles } from '../../datastore/actions'
import Navigation from './Navigation'

const mapStateToProps = (state) => {
  const roles = state.player.roles ? state.player.roles : []
  return {
    roles,
    userLoggedOut: state.player.userLoggedOut
   }
}

const mapDispatchToProp = (dispatch) => {
  return {
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    loadRoles: () => dispatch(loadRoles())
  }
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProp
)(Navigation)

export default ConnectedNavigation
