import { connect } from 'react-redux'
import { loadProfile, saveProfileUpdates, changeProfile } from '../../datastore/actions'
import Account from './Account'

const mapStateToProps = (state) => {
  const editMode = state.account && state.account.status === 'EDITING'
  const profile = (state.player) ? state.player.profile : {}
  const profileChanges = (state.player) ? state.player.profileChanges : undefined
  return {
    profile,
    profileChanges,
    editMode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProfile: () => {
      dispatch(loadProfile())
    },
    changeProfile: (update) => {
      dispatch(changeProfile(update))
    },
    saveProfile: () => {
      dispatch(saveProfileUpdates())
    }
  }
}

const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountPage
