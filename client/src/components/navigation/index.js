import { connect } from 'react-redux'
import { loadRoles } from '../../datastore/actions'
import Navigation from './Navigation'

const mapStateToProps = (state) => {
  return {
    isAdmin: state.account.isAdmin,
    isAuthor: state.account.isAuthor
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    loadRoles: () => dispatch(loadRoles())
  }
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProp
)(Navigation)

export default ConnectedNavigation
