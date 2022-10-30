import React from 'react'
import { Link } from 'react-router-dom'

const Employee = ({user}) =>  (
    <Link to={`/admin/user/${user._id}`} >
    <h5 style={{backgroundColor: '#f7b901'}} className='rounded text-dark  p-2' ><strong>{user.userName}</strong></h5>
    </Link>
  )


export default Employee
