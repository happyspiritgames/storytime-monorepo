import { connect } from 'react-redux'
import { loadRoles } from '../../datastore/actions'
import Navigation from './Navigation'

const mapStateToProps = (state) => {
  return {
    roles: state.player.roles
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    reloadRoles: () => dispatch(loadRoles)
  }
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProp
)(Navigation)

export default ConnectedNavigation
