import React from 'react'
import {useDispatch} from 'react-redux'
import { Link} from 'react-router-dom'
import { chooseRegister } from '../../actions'

const ChooseRegister = ({toggle}) => {

  let dispatch = useDispatch()
  return (
    <div className='register_main'>
      <Link 
      onClick={() => {
        dispatch(chooseRegister('boss'))
        toggle()
      }} to="/signup" className="btn btn-primary mb-3">Jestem pracodawcą</Link>
      <Link 
      onClick={() => {
        dispatch(chooseRegister('employee'))
        toggle()
      }} to="/signup" className="btn btn-primary">Jestem pracownikiem</Link>
    </div>
  )
}

export default ChooseRegister