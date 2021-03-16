
import {useDispatch} from 'react-redux' ;
import '../css/appinput.css' ;
import { APIService } from '../services/APIService';

import {useAlert} from 'react-alert'


export default function AppInput() {
    
    const dispatch = useDispatch() ;

    const myAlert = useAlert() ;

    const addEmail = () => {
        
        let email = document.querySelector(".app-input > input[name='app-input']").value ;

        APIService.addMember(dispatch,email,myAlert) ;

        document.querySelector(".app-input > input[name='app-input']").value = ''
    }

    return (
        
        <div className='app-input'>
             <input name="app-input" placeholder="enter email" />   
             <button onClick={addEmail} >ADD</button>
        </div>
    );
}