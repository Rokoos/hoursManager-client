import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux' 
import {Redirect} from 'react-router-dom'
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact';
import {toast} from 'react-toastify'
import { signin, saveUserInLS, isAuthenticated } from './index'
import { roleBasedRedirect } from '../Auth'
import { login} from '../../actions'
import Spinner from '../Spinner'


const SignIn = ({history}) => {

  let dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const loginData = {
      email,
      password
    }
    
      signin(loginData)
      .then(res => {
        if(res.error) {
          toast.error(res.error)
          setLoading(false)
        }

        const userData = {
          _id: res.user._id,
          token: res.user.token,
          userName:  res.user.userName,
          companyName: res.user.companyName ,
          role: res.user.role,
          email: res.user.email,
          years: res.unique
        }
        saveUserInLS({
          token:res.user.token, 
          role: res.user.role,
          _id: res.user._id
        })
        roleBasedRedirect(res, history)
        dispatch(login(userData))
        toast.success(`Witaj ${res.user.userName.split(' ')[0]}!`) 
      })
      .catch(error=> toast.error(error))
      
      
  }
  if(loading) {
    return <Spinner/>
  }

  if(user && user.role === 'admin'){
    return <Redirect to='/admin/dashboard' />
  }
  if(user && user.role === 'user'){
    return <Redirect to={`/user/${isAuthenticated()._id}`} />
  }

  return (
    <MDBRow center className="large-margin mb-5">
            <MDBCol md="6" lg="4">
              <MDBCard >
                <MDBCardBody className="mx-4">
                <form onSubmit={handleSubmit} >
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Logowanie</strong>
                    </h3>
                  </div>
                  <MDBInput
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                    label="Podaj email"
                    type="email"
                    className="mb-5"
                  />
                  <MDBInput
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  className="mb-5"
                  label="Podaj hasło"
                    type="password"
                  />
                 
                  <div className="text-center mb-3"> 
                    <MDBBtn
                      type="submit"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                    >
                      Zaloguj się
                    </MDBBtn>
                  </div>      
                  </form>
                </MDBCardBody>
                
              </MDBCard>
            </MDBCol>
          </MDBRow>
  )
}

export default SignIn



