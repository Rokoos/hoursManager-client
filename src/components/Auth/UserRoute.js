import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = ({component: Component, match, ...rest}) => {
    const user = useSelector(state => state.user )
    const userId = rest.computedMatch.params.userId
    return(
        <Route {...rest} render={props => user && 
            user._id === userId 
             ? (
            <Component {...props} />
           ) : (
               <Redirect to='/'/>
           )} />
    )
}

export default UserRoute
