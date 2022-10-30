import { combineReducers} from 'redux'
import {registerReducer} from './registerReducer'
import { userReducer } from './userReducer'

export default combineReducers({
  register: registerReducer,
  user: userReducer
})