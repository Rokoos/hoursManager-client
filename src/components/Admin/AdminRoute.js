import React from 'react'
import { Route} from 'react-router-dom'
import { useSelector} from 'react-redux'
import LoadingToRedirect from '../Auth/LoadingToRedirect'



const AdminRoute = ({component: Component, ...rest}) => {

  const user = useSelector(state => state.user)
  return(
      <Route {...rest} render={props => (user && user.role === 'admin') ? (
          <Component {...props} />
         ) : (
             <LoadingToRedirect/>
         )} />
  )
}

export default AdminRoute
