import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';

import M from 'materialize-css';
import {updateLoginStatus} from '../actions/index';

class Nav extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    state = {
        success: false,
        error: null
    }

    logout = () => {
        let api_url = "http://localhost:80/api/admins/logout";
        axios({
            method: 'post',
            url: api_url,
        })
        .then(resp => {
            if (resp.data.status === "success") {
                this.props.updateLoginStatus({loggedIn: false});
                this.setState({success: true});
                M.toast({html: "Successfully logged out"})
            }
        })
        .catch(err => {
            this.setState({error: err.response.data.message});
            M.toast({html: err.response.data.message});
        })
    }

    render() {
        if (this.state.success || !this.props.loggedIn) {
            return <Redirect to="/" />
        } else {
            return (
                <div>
                    <nav className="indigo darken-4">
                        <div className="nav-wrapper">
                            <Link to="/dashboard" className="brand-logo">Admin Dashboard</Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li className={this.props.currentPage === "admins" ? "active": ""}>
                                    <Link to="/dashboard/admins" onClick={() => this.props.onClickNavLink("admins")}>Admins</Link>
                                </li>
                                <li className={this.props.currentPage === "staffs" ? "active": ""}>
                                    <Link to="/dashboard/staffs" onClick={() => this.props.onClickNavLink("staffs")}>Staffs</Link>
                                </li>
                                <li className={this.props.currentPage === "permissions" ? "active": ""}>
                                    <Link to="/dashboard/permissions" onClick={() => this.props.onClickNavLink("permissions")}>Permissions</Link>
                                </li>
                                <li>
                                    <Link to="#" className="waves-effect waves-light btn red darken-4" onClick={this.logout}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )

        }
    }    
}

// This component requires only the loggedIn state from the global
// redux store to update the login status.
function mapStateToProps({login, admin}, ownProps) {
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