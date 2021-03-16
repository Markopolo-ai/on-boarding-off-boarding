import '../css/loginbox.css'

import {useDispatch} from 'react-redux' ;

import {AuthService} from '../services/AuthService' ;

export default function LoginBox() {

    const dispatch = useDispatch() ;
    const login = () => {
        
        AuthService.login('admin','admin')
        //   dispatch( {type:'LOGIN' , payload:{'loggedin':true} } ) ;
    }
    return (
        <div className="loginbox">
                
                <div className="name">
                    {/* MARKOPOLO.AI */}
                </div>
                <input type="text" placeholder="email"/>
                <input type="password" placeholder="password"/>
     
                <button onClick={login} > Login </button>
            
            
        </div>
    );
}