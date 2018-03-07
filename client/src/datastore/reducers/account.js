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
      const editMode = state.editMode
      const changes = state.profileChanges
      const { field, value } = action.payload
      if (!editMode || !changes || !field) {
        return state
      }
      const nextChanges = {
        ...changes,
        [field]: value
      }
      return {
        ...state,
        profileChanges: nextChanges
      }
    default:
      return state
  }
}