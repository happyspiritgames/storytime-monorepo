import { connect } from 'react-redux'
import { login, logout, loadRoles } from '../../datastore/actions'
import Navigation from './Navigation'

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.account.isLoggedIn,
    isAdmin: state.account.isAdmin,
    isAuthor: state.account.isAuthor
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    doLogin: () => dispatch(login()),
    doLogout: () => dispatch(logout()),
    doLoadRoles: () => dispatch(loadRoles())
  }
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProp
)(Navigation)

export default ConnectedNavigation
