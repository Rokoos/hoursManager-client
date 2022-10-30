import React, {Fragment, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUsers } from './index'
import Employees from './Employees'

const AdminDashboard = () => {

  const [users, setUsers] = useState([])

  const user = useSelector(state => state.user)

  useEffect(() => {
    fetchUsers(user._id, user.token)
  .then(data => {
    if(data.error){
      toast.error('Brak dostępu. Zaloguj się ponownie.')
    }else{
      setUsers(data)
}
})
  }, [user._id, user.token])

  

  return (
    <div className='container text-center' style={{marginTop: '200px'}}>
      <h3 className='rounded text-center bg-dark header-main_color p-2 mb-4'  >{user.companyName}</h3>
      {users.length > 0 ? (
        <Fragment>
          <h5 className='mb-3' >Zarejestrowani pracownicy:</h5>
          <Employees users={users} />
        </Fragment>
      ) : (<h5>Brak zarejestrowanych pracowników.</h5>)}
    </div>
  )
}

export default AdminDashboard
