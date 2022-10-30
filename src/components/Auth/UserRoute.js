import React from 'react'
import { Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({component: Component, match, ...rest}) => {
    const user = useSelector(state => state.user )
    const userId = rest.computedMatch.params.userId
    return(
        <Route {...rest} render={props => user && 
            user._id === userId 
             ? (
            <Component {...props} />
           ) : (
               <LoadingToRedirect/>
           )} />
    )
}

export default UserRoute
