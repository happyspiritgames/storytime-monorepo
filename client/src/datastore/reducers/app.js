// TODO create these actions and handle them here
// import { CLEAR_MESSAGES, RECEIVE_MESSAGES, CHANGE_STATUS, RESET_STATUS } from '../actions'

export const initialState = {
  status: 'READY',
  messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}