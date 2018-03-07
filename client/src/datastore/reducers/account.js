import { EDIT_PROFILE, UPDATED_PROFILE, CHANGE_PROFILE } from '../actions'

export const initialState = {
  editMode: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      const { profileToUpdate } = action.payload
      const profileChanges = {
        id: profileToUpdate.id,
        nickname: profileToUpdate.nickname,
        emailOptIn: !!profileToUpdate.emailOptInAt,
        penName: profileToUpdate.penName
      }
      return {
        ...state,
        editMode: true,
        profileChanges
      }
    case UPDATED_PROFILE:
      return {
        ...state,
        editMode: false
      }
    case CHANGE_PROFILE:
      return state
    default:
      return state
  }
}