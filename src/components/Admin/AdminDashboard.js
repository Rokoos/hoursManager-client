import React, {Fragment, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUsers } from './index'
import Employees from './Employees'
import Spinner from '../Spinner'

const AdminDashboard = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user)

  useEffect(() => {
    setLoading(true)
    fetchUsers(user._id, user.token)
  .then(data => {
    if(data.error){
      // setLoading(false)
      toast.error('Brak dostępu. Zaloguj się ponownie.')
    }else{
      setUsers(data)
      // setLoading(false)
}
})
  }, [user._id, user.token])

  const text = () => {
    return users.length > 0 ? <h5 className='mb-3' >Zarejestrowani pracownicy:</h5> : <h5>Brak zarejestrowanych pracowników.</h5>
  }

  if(loading){
    return <Spinner/>
  }

  return (
    <div className='container text-center' style={{marginTop: '200px'}}>
      {!user.token || loading ? <Spinner/> : (
        <Fragment>
        <h3 className='rounded text-center bg-dark header-main_color p-2 mb-4'  >{user.companyName}</h3>
      {text()}
      {users.length > 0 && <Employees users={users} />}
        </Fragment>
      )}
    </div>
  )
}

export default AdminDashboard
