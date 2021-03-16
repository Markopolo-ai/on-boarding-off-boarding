
import { useSelector , useDispatch } from "react-redux" ;
import '../css/header.css'

export default function Header() {
    
    const dispatch = useDispatch() ;
    
    const loggedin = useSelector ( state => state.counter.loggedin )  ;
    
    const logout = () => {
        dispatch( { type:'LOGIN' , payload: { 'loggedin' : false } } ) ;
    };
    
    return (
        <div className="app-header">
            <div className="name">MARKOPOLO.AI</div>
            <div></div>
            <div className="logout"  onClick={ logout } >LOGOUT</div>
        </div>
    )
}