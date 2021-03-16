import '../css/loginbox.css'

import {useDispatch} from 'react-redux' ;

import {AuthService} from '../services/AuthService' ;

import { useAlert } from 'react-alert' ;

export default function LoginBox() {

    const dispatch = useDispatch() ;

    const myAlert   = useAlert() ;

    const login = () => {
        
        let username = document.querySelector(".loginbox > input[name='username']").value ;

        let password = document.querySelector(".loginbox > input[name='password']").value ;
        
        AuthService.login(dispatch,username,password,myAlert)

    }

    return (
        <div className="loginbox">
                
                <div className="name">
                    MARKOPOLO.AI
                </div>
                <input name='username' type="text" placeholder="username"/>
                <input name='password' type="password" placeholder="password"/>
     
                <button onClick={login} > Login </button>
            
            
        </div>
    );
}