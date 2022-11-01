import React, {Fragment, useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUsers, deleteAdmin, } from './index'
import { logout } from '../../actions'
import { killToken } from '../Auth'
import Employees from './Employees'
import Spinner from '../Spinner'
import Modal from '../Modal'

const AdminDashboard = ({history}) => {

  let dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  
  const toggle = () => setModal(!modal)

  const user = useSelector(state => state.user)
  const token = user.token
  const userId = user._id


  useEffect(() => {
    setLoading(true)
    fetchUsers(userId,token)
  .then(data => {
    if(data.error){
      setLoading(false)
      toast.error('Brak dostępu. Zaloguj się ponownie.')
    }else{
      setUsers(data)
      setLoading(false)
}
})
  }, [userId, token])

  const text = () => {
    return users.length > 0 ? <h5 className='mb-3' >Zarejestrowani pracownicy:</h5> : <h5>Brak zarejestrowanych pracowników.</h5>
  }

  const removeAdmin = () => {
    setLoading(true)
    deleteAdmin(userId,token)
    .then(res => {
      if(res.error) {
        setLoading(false)
        console.log(res.error)
      }
      setLoading(false)
      dispatch(logout())
      killToken()
      history.push('/')
      toast.success(`Konto zostało pomyślnie usunięte. Do zobaczenia!`)
    })
    .catch(error=> {
      console.log(error)
      setLoading(false)
    })
  }

  if(loading){
    return <Spinner/>
  }

  return (
    <div className='container text-center large-margin' >
      {!user.token || loading ? <Spinner/> : (
        <Fragment>
        <h3 className='rounded text-center bg-dark header-main_color p-2 mb-4'  >{user.companyName}</h3>
      {text()}
      {users.length > 0 && <Employees users={users} />}
        </Fragment>
      )}
        <div onClick={toggle} className="btn btn-danger mt-3">usuń konto firmy</div>
      <Modal
        toggle={toggle} modal={modal}>
        <div className='p-4 text-center'>
          <h5>Czy na pewno chcesz usunąć konto?</h5>
          <div >
            <button onClick={() => {
              toggle()
              removeAdmin()
            }} className="btn btn-danger">Usuń</button>
            <button onClick={toggle} className="btn btn-light">Anuluj</button>
          </div>
        </div>
      </Modal> 
    </div>
  )
}

export default AdminDashboard
