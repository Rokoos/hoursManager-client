import React from 'react'
import Employee from './Employee'

const Employees = ({users}) => (
  users.map(user => (
    <Employee key={user._id} user={user} />
  ))
)


export default Employees
