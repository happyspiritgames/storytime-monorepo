import { getProfile, updateProfile as apiUpdateProfile } from '../../apis/storyTimeApi'

export const FETCH_PROFILE = 'FETCH_PROFILE'
export const fetchProfile = () => ({
  type: FETCH_PROFILE,
})

export const FETCHED_PROFILE = 'FETCHED_PROFILE'
export const fetchedProfile = (profile) => ({
  type: FETCHED_PROFILE,
  payload: {
    profile
  }
})

export const FETCH_PROFILE_FAILED = 'FETCH_PROFILE_FAILED'
export const fetchProfileFailed = (error) => ({
  type: FETCH_PROFILE_FAILED,
  payload: error,
  error: true
})

export const EDIT_PROFILE = 'EDIT_PROFILE'
export const editProfile = (profileToUpdate) => ({
  type: EDIT_PROFILE,
  payload: {
    profileToUpdate
  }
})

// capture local changes to profileUpdate in data store
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const changeProfile = (profileUpdate) => ({
  type: CHANGE_PROFILE,
  payload: {
    profileUpdate
  }
})

export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const updateProfile = () => ({
  type: UPDATE_PROFILE,
})

export const UPDATED_PROFILE = 'UPDATED_PROFILE'
export const updatedProfile = (profile) => ({
  type: UPDATED_PROFILE,
  payload: {
    profile
  }
})

export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED'
export const updateProfileFailed = (error) => ({
  type: UPDATE_PROFILE_FAILED,
  payload: error,
  error: true
})

export const FETCH_ROLES = 'FETCH_ROLES'
export const fetchRoles = () => ({
  type: FETCH_ROLES,
})

export const FETCHED_ROLES = 'FETCHED_ROLES'
export const fetchedRoles = (roles) => ({
  type: FETCHED_ROLES,
  payload: {
    roles
  }
})

export const FETCH_ROLES_FAILED = 'FETCH_ROLES_FAILED'
export const fetchRolesFailed = (error) => ({
  type: FETCH_ROLES_FAILED,
  payload: error,
  error: true
})

export const loadProfile = () => {
  return (dispatch) => {
    dispatch(fetchProfile())
    getProfile(
      profile => { dispatch(fetchedProfile(profile)) },
      error => { dispatch(fetchProfileFailed(error)) }
    )
  }
}

// send whatever is found in profileUpdate to remote service
export const saveProfile = () => {
  return (dispatch, state) => {
    const profileUpdate = state.player.profileUpdate
    if (!profileUpdate) {
      return
    } else if (profileUpdate === state.player.profile) {
      dispatch(updatedProfile(state.player.profileUpdate))
      return
    }
    dispatch(updateProfile())
    apiUpdateProfile(
      profile => { dispatch(updatedProfile(profile)) },
      error => { dispatch(updateProfileFailed(error)) }
    )
  }
}

export const loadRoles = () => {

}