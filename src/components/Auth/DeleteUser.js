import React, {Fragment, useState} from 'react'
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../actions'
import {toast} from 'react-toastify'


import Modal from '../Modal'

import { deleteUser, killToken} from './index'

const DeleteUser = ({user, history}) => {
  const [modal, setModal] = useState(false)
  let dispatch = useDispatch()
  

  const toggle = () => setModal(!modal)

  const removeUser = () => {
    const token = user.token
    const userId = user._id

    deleteUser(userId, token, user)
    .then(data => {
      if(data.error){
        console.log('error',data.error)
      }else{
        toast.success(`Do zobaczenia ${data.userName}!`)
        dispatch(logout())
        killToken()
        history.push('/')
      }
    })
  }

  return (
    <Fragment>
      <div onClick={toggle} style={{width:'264px'}} className="btn btn-danger mb-5">Usuń konto</div>
      <Modal
        toggle={toggle} modal={modal}>
        <div className='p-4 text-center'>
          <h5>Czy na pewno chcesz usunąć konto?</h5>
          <div >
            <button onClick={() => {
              toggle()
              removeUser()
            }} className="btn btn-danger">Usuń</button>
            <button onClick={toggle} className="btn btn-light">Anuluj</button>
          </div>
        </div>
      </Modal> 
    </Fragment>
  )
}

export default withRouter(DeleteUser)
