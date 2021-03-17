import React from 'react';
import Logo from '../logo.svg';

const Navbar = () => {
    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="www.google.com"> <img src={Logo} width="25%" height="25%" alt=""/> </a>
                
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="www.google.com">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="www.google.com">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="www.google.com">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
