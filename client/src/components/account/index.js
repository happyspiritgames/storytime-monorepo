import { connect } from 'react-redux'
import { loadProfile, editProfile, changeProfile, saveProfile } from '../../datastore/actions'
import Account from './Account'

const mapStateToProps = (state) => {
  return {
    profile: state.player.profile,
    editMode: state.account.editMode,
    profileChanges: state.account.profileChanges
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    loadProfile: () => {
      dispatch(loadProfile())
    },
    editProfile: (profile) => {
      dispatch(editProfile(profile))
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
