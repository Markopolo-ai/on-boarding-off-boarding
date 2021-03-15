import React from 'react';
import { Link } from 'react-router-dom';

import './dropdown.scss';


const Dropdown = ({show, resetShow}) => {

    const cookie = document.cookie;

    const handleClick = e => {
        resetShow(false);
    }
    const handleLogOut= e => {
        const res = document.cookie;
        let multiple = res.split(";");
        for(let i = 0; i < multiple.length; i++) {
           let key = multiple[i].split("=");
           document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        } 
        resetShow(false);    
    }

    return (
        <>
        {
            show ? 
                <div className="dropdown">
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {!cookie ? <><Link to="/signin" onClick={handleClick} className="dropdown-item"  >Sign in</Link>
                                    <button className="dropdown-item" type="button">Register</button> </>: <>
                        <button className="dropdown-item" type="button">View Profile</button>
                        <Link to="/signin" onClick={handleLogOut} className="dropdown-item"  >Logout</Link>
                        </>}
                    </div>
                </div> : ''
        }
        </>
    )
}

export default Dropdown;