import { connect } from 'react-redux'
import { loadProfile, editProfile, changeProfile, saveProfile } from '../../datastore/actions'
import Account from './Account'

const mapStateToProps = (state) => {
  const editMode = state.account.editMode
  const profile = (state.player) ? state.player.profile : {}
  const profileChanges = (state.account) ? state.account.profileChanges : undefined
  return {
    profile,
    profileChanges,
    editMode
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    loadProfile: () => {
      dispatch(loadProfile())
    },
    editProfile: () => {
      dispatch(editProfile(state.player.profile))
    },
    changeProfile: (update) => {
      dispatch(changeProfile(update))
    },
    saveProfile: () => {
      dispatch(saveProfile())
    }
  }
}

const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountPage
