import {
  SIGN_IN,
  SIGN_OUT,
  LOGGED_IN
} from '../actions/types'

const initState = {
  _id: '',
  token: '',
  companyName: '',
  userName: '',
  email: '',
  role: '',
  years:[]
}

export const userReducer = (state = initState, {type, payload}) => {
  switch(type) {
    case SIGN_IN:
      return {
        ...state, 
        ...payload
      }
      case  LOGGED_IN: 
        return {
          ...state, 
          ...payload
        }
      
      case SIGN_OUT:
        return initState
    default:
      return state
  }
}