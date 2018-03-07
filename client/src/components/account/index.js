import { connect } from 'react-redux'
import { loadProfile, editProfile, stopEditProfile, saveProfile } from '../../datastore/actions'
import Account from './Account'

const mapStateToProps = (state) => {
  return {
    profile: state.player.profile,
    editMode: state.account.editMode
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    loadProfile: () => {
      dispatch(loadProfile())
    },
    editProfile: () => {
      dispatch(editProfile())
    },
    saveProfileChanges: (update) => {
      dispatch(saveProfile(update))
    },
    cancelEditProfile: () => {
      dispatch(stopEditProfile())
    }
  }
}

const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)

export default AccountPage
