import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import {updateLoginStatus} from '../actions/index';

class Nav extends Component {
    componentDidMount() {
        console.log(this.props.loggedIn);
    }

    logout = () => {
        console.log("sdfsd")
    }

    render() {
        return (
            <nav className="indigo darken-4">
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Admin Dashboard</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to="/admins">Admins</Link></li>
                    <li><Link to="/staffs">Staffs</Link></li>
                    <li><Link to="/permissions">Permissions</Link></li>
                    <li><Link className="waves-effect waves-light btn-large red darken-4" to="/logout" >Logout</Link></li>
                </ul>
                </div>
            </nav>
        )
    }    
}

// This component requires only the loggedIn state from the global
// redux store to update the login status.
function mapStateToProps({login, admin}) {
    return {
        loggedIn: login.loggedIn
    }
}

// This component requires only the UPDATE_LOGIN_STATUS action to
// update login state of the current user.
function mapDispatchToProps(dispatch) {
    return {
        updateLoginStatus: (data) => dispatch(updateLoginStatus(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);