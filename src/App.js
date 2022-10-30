import React, {useCallback, useEffect} from 'react'
import { BrowserRouter} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import Routes from './routes'
import { isAuthenticated, killToken, fetchUser } from './components/Auth'
import { fetchAdmin } from './components/Admin'
import { loggedIn} from './actions'


// import Spinner from './components/Spinner'


import "./index.css"
import { useState } from 'react'




const App = () => {

  // const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const userId = isAuthenticated()._id 
  const token = isAuthenticated().token


  const loadUser = useCallback(() => {

    if(isAuthenticated() && isAuthenticated().role === 'user'){
      // setLoading(true)
      fetchUser(userId, token)
      .then(data => {
        if(data.error){
            // setLoading(false)
            killToken()
        }else{
            dispatch(loggedIn({
              _id: data.user._id,
              userName: data.user.userName,
              companyName: data.user.companyName,
              role: data.user.role,
              email: data.email,
              data: data.user.data,
              token,
              years: data.unique
            }))
            // setLoading(false)
        }
    })
    }

    if(isAuthenticated() && isAuthenticated().role === 'admin'){
      // setLoading(true)
      fetchAdmin(userId, token)
      .then(data => {
        if(data.error){
            // setLoading(false)
            killToken()
        }else{
          dispatch(loggedIn({
            _id: data.user._id,
            userName: data.user.userName,
            companyName: data.user.companyName,
            role: data.user.role,
            email: data.user.email,
            data: data.user.data,
            token,
            years: data.unique
          }))
          // setLoading(false)
        }
      })
    }
    
  }, [userId, token, dispatch])
  
    
    useEffect(() => {
      
      loadUser()
    }, [ loadUser])

  // if(loading){
  //   return <Spinner/>
  // }

  return (
    <BrowserRouter>
     <Routes/>
    </BrowserRouter>
)
}

export default App
