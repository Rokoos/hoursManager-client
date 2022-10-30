import {
  CHOOSE_REGISTER,
  CLEAR_REGISTER,
  SIGN_IN,
  SIGN_OUT,
  LOGGED_IN
} from './types'

export const chooseRegister = (user) => ({
  type: CHOOSE_REGISTER,
  payload: user
})

export const clearRegister = () => ({
  type: CLEAR_REGISTER
})


export const login = (user) => ({
  type: SIGN_IN,
  payload: user
})

export const logout = () => ({
  type: SIGN_OUT
})


export const loggedIn = (user) => ({
  type: LOGGED_IN,
  payload: user
})
  