
import {useDispatch} from 'react-redux' ;
import '../css/appinput.css' ;
import { APIService } from '../services/APIService';

export default function AppInput() {
    
    const dispatch = useDispatch() ;

    
    const addEmail = () => {
        
        let email = document.querySelector(".app-input > input[name='app-input']").value ;

        APIService.addMember(dispatch,email ) ;
        
        document.querySelector(".app-input > input[name='app-input']").value = ''
    }

    return (
        
        <div className='app-input'>
             <input name="app-input" placeholder="enter email" />   
             <button onClick={addEmail} >ADD</button>
        </div>
    );
}