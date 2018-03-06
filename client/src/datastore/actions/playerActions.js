import { getProfile } from '../../apis/storyTimeApi'

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

export const loadProfile = () => {
  return (dispatch) => {
    dispatch(fetchProfile())
    getProfile(
      profile => { dispatch(fetchedProfile(profile)) },
      error => { dispatch(fetchProfileFailed(error)) }
    )
  }
}
