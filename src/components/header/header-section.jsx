import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Dropdown from '../common-component/dropdown.jsx';

import './header.scss';



const Header = ({search, activepage, selectActivePage}) => {
    const [showSerach, setShowSearch] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const cookie = document.cookie;

    const handleChange = (e) => {
        console.log(e.target.value);
        search(e.target.value)
      }
  
    return (
        <div className="header-container col-md-12 col-xs-12">
            <div className="col-md-7 navbar-left col-xs-7">
                <div className="col-md-12 col-xs-12">
                        <Link to='/' onClick={() => selectActivePage('home')}><span className="wordart italic-outline"><span className="text">Markopolo.<span className='lower-case'>ai</span></span></span></Link>
                    <span className="col-md-2 col-xs-2 nav-menu">
                        <Link to='/current' onClick={() => selectActivePage('current')}><span className={`nav-menu-text ${activepage === 'current' ? 'selected': ''}`}>Current Employee</span> </Link>
                    </span>
                    <span className="col-md-2 col-xs-2 nav-menu">
                        <Link to='/revoked' onClick={() => selectActivePage('revoked')}><span className={`nav-menu-text ${activepage === 'revoked' ? 'selected': ''}`}>Revoked Employee</span></Link>
                    </span>
                </div>
            </div>
            <div className="col-md-2 navbar-right">
                <div className="col-md-12 col-xs-12">
                    <div className="col-md-12 col-xs-12 nav-menu-right">
                        <span className="nav-menu-right" >
                            <span className="user-section">
                                <i className="fa fa-user-circle"></i>
                            </span>
                            <span className="username">
                                John Doe
                            </span>
                            <span className="option-caret" onBlur={() => setShowDropdown(false)} onClick={() => setShowDropdown(true)}>
                                <i className="fa fa-caret-down"></i>
                            </span>
                        </span>
                        {showDropdown ? <Dropdown show={showDropdown} resetShow={setShowDropdown}/>: ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;