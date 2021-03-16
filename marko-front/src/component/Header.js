
import { useSelector , useDispatch } from "react-redux" ;
import '../css/header.css'

import {AuthService} from '../services/AuthService'  ;

export default function Header() {
    
    const dispatch = useDispatch() ;
        
    const logout = () => {
        
        AuthService.logout(dispatch)
    };
    
    return (
        <div className="app-header">
            <div className="name">MARKOPOLO.AI</div>
            <div></div>
            <div className="logout"  onClick={ logout } >LOGOUT</div>
        </div>
    )
}