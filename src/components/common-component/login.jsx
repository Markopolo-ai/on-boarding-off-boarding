import axios from 'axios';
import React,{useState} from 'react';

import FormInput from './form-input.jsx';

import "./login.scss";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        let userData = {email, password};

        await axios.get("/signin/", {
            "Content-Type": 'application/json',
            params:userData
        }).then(res => {
        
            document.cookie = `token=${res.data}`
           
        });
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <FormInput type="email" value={email} name="email" handleChange= {e => setEmail(e.target.value)} label= "Email" required />
                <FormInput type="password"  value= {password} name="password" handleChange= {e => setPassword(e.target.value)} label= "Password" required />
                <div className="buttons">
                    <input className="submit-button" type="submit" value="Sign In"/> 
                </div>
            </form>
        </div>
    )
}


export default Login