import {
  CHOOSE_REGISTER,
  CLEAR_REGISTER
} from '../actions/types'

const initState = {
  chooseRegister: '',
  companyName: '',
  userName: '',
  email: '',
  role: ''
}

export const registerReducer = (state = initState, {type, payload}) => {
  switch(type) {
    case CHOOSE_REGISTER:
      return {...state, chooseRegister: payload}
    case CLEAR_REGISTER:
        return {...state, chooseRegister: ''}
    default:
      return state
  }
}
