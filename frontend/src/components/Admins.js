import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import AdminForm from './AdminForm';
import { updateLoginStatus, updateAdminAccessToken, updateAdminData } from '../actions';

class Admin extends Component {
    state = {

    }

    render() {
        return(
            <div className="container">
                <Route path="/admin/manage" component={AdminForm} />
                <h3>Welcome {this.props.email}</h3>
                <Link to={{
                    pathname="/admin/manage",
                    linkProps = {
                        action='edit',
                        self=true,
                        editId=this.props.id
                    }
                }} className="waves-effect waves-light btn teal darken-4">Edit Your Details</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);