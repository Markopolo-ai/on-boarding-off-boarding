import React from 'react' ;
import { Route , Redirect } from 'react-router-dom' ;
import { IsLoggedIn } from '../utils' ;

const PublicRoute = ({component: Component , restricted , ...rest}) => {

    const login = IsLoggedIn() ;
    
    return (    
        <Route  {...rest} render={ props => (
            login && restricted ? <Redirect to="/" /> : <Component  {...props} /> 
        ) } />
    );
}


export default PublicRoute ;