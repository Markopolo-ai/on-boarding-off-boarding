import React from 'react' ;
import { Route , Redirect } from 'react-router-dom' ;
import { isLoggedIn } from '../utils' ;

const PublicRoute = ({component: Component , restricted , ...rest}) => {
    return (    
        <Route  {...rest} render={ props => (
            isLoggedIn() && restricted ? <Redirect to="/list" /> : <Component  {...props} /> 
        ) } />
    );
}


export default PublicRoute ;