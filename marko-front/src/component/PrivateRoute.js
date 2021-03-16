import React from 'react' ;
import { Route ,Redirect } from 'react-router-dom'
import { IsLoggedIn } from '../utils'
const PrivateRoute = ({component: Component,...rest}) => {

    const login = IsLoggedIn() ;
    
    return (
        <Route {...rest} render={ props => (
            login ? <Component {...props} /> : <Redirect to="/login" />
        )} />
    ) ;

}


export default PrivateRoute ;