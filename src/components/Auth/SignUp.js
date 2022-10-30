import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {toast} from 'react-toastify'

import { signup, isAuthenticated} from './index'
import {chooseRegister, clearRegister } from '../../actions'
import { getCompanies} from '../Admin'
import Spinner from '../Spinner'

import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact';


const SignUp = ({history}) => {

  const dispatch = useDispatch()
  const {register, user} = useSelector(state => ({...state}) )

  const [name, setName] = useState('')
  const [companies, setCompanies] = useState([])
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCompanies()
    .then(data => {
      if(data.error) setError(data.error)
       else {
        setCompanies(data)
       }
    })
    
  }, [])

  useEffect(()=> {
    if(error){
      toast.error(error)
      setError('')
    }
  }, [error])

  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault()

    const registrationData = {
        companyName: company,
        userName: name,
        email,
        password,
        role: register.chooseRegister === 'admin' ? 'admin' : 'user'
    }

    signup(registrationData)
    .then(data => {
        if(data.error) {
          setError(data.error)
          setLoading(false)
        }
        else{
          setLoading(false)
          dispatch(clearRegister())
          toast.success('Rejestracja zakończona powodzeniem! Możesz się zalogować.')
          history.push('/')
        } 
 
    })

}

const renderBossOrEmployeeForm = () => {
  if(register.chooseRegister === "admin"){
    return (
       <MDBInput
        onChange={e => setCompany(e.target.value)}          value={company}
        label="Podaj nazwę firmy"
        type="text"
        className="mb-5 pl-1"
          />
    )
  }else {
   return (
      <select
      value={company}
      onChange={e => setCompany(e.target.value)} className="form-select" aria-label="Default select example">
        <option>Wybierz firmę</option>
        {companies.map(firm => (
          <option key={firm._id} value={firm._id}>{firm.companyName}</option>
        ))}
      </select>
   )
  }
}

const renderForm = () => (
  <Fragment>
    {renderBossOrEmployeeForm()}
    <MDBInput
        onChange={e => setName(e.target.value)}
        value={name}
        label="Podaj imię i nazwisko"
        type="text"
        className="mb-5 pl-1"
      />
    <MDBInput
      onChange={e => setEmail(e.target.value)}
      value={email}
      label="Podaj email"
      type="email"
      className="mb-5 pl-1"
    />          
    <MDBInput
      onChange={e => setPassword(e.target.value)}
      value={password}
      className="mb-5 pl-1"
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
      Zarejestruj
      </MDBBtn>
    </div> 
    </Fragment>                  
)

const chooseCompanyOrUser = () => (
  <select onClick={e => dispatch(chooseRegister(e.target.value))} className="form-select" aria-label="Default select example">
      <option value=''>Wybierz opcję</option>
        <option value='admin'>Jestem Pracodawcą</option>
        <option value='user'>Jestem Pracownikiem</option>
    </select>
)

const renderHeader = () => {
  const jajco = register.chooseRegister
  if(jajco === ''){
    return 'Rejestracja'
  }else if(jajco === 'admin'){
    return 'Rejestracja Firmy'
  }else {
    return 'Rejestracja Pracownika'
  }
}

if(loading){
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
            <form onSubmit={handleSubmit} >
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-4">
                      <strong >
                        {renderHeader()}
                      </strong>
                    </h3>
                    
                  </div>
                  {register.chooseRegister === ''?  chooseCompanyOrUser() : renderForm() }    
                </MDBCardBody>
              </MDBCard>
              </form>
            </MDBCol>
          </MDBRow>
    
  )
}

export default SignUp


