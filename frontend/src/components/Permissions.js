import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import AdminForm from './AdminForm';
import { updateLoginStatus, updateAdminAccessToken, updateAdminData } from '../actions';

class Permission extends Component {
    render() {
        return(
            <div className="container">
                <h3>Manage Permissions</h3>
                <hr/>
            </div>
        )
    }
}

function mapStateToProps({login, admin}) {
    return {
        loggedIn: login.loggedIn,
        id: admin.id,
        email: admin.email,
        isSuperAdmin: admin.isSuperAdmin,   
        token: admin.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateLoginStatus: (data) => dispatch(updateLoginStatus(data)),
        updateAdminData: (data) => dispatch(updateAdminData(data)),
        updateAdminToken: (data) => dispatch(updateAdminAccessToken(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Permission);