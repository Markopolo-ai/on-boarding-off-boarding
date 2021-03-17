import React, {Component} from 'react';
import { Route } from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';

import Nav from './Nav';
import Admin from './Admins';
import Staff from './Staffs';
import Permission from './Permissions';
import { updateLoginStatus, updateAdminAccessToken, updateAdminData } from '../actions';

class Dashboard extends Component {
    state = {
        currentPage: "admin"
    }

    checkCurrentAdmin = () => {
        let api_url = "http://localhost:80/api/admins/login";
        axios({
            method: 'get',
            url: api_url
        })
        .then(resp => {
            this.props.updateAdminData({
                id: resp.data.id,
                email: null,
                isSuperAdmin: null
            });
            this.fetchAdminData();
        })
        .catch(error => console.log(error));
    }

    fetchAdminData = () => {
        let api_url = `http://localhost:80/api/admins/${this.props.id}`;
        axios({
            method: 'get',
            url: api_url
        })
        .then(resp => {
            let {id, email, is_superadmin} = resp.data.data;
            this.props.updateAdminData({
                id: id,
                email: email,
                isSuperadmin: is_superadmin
            });
        })
        .catch(error => console.log(error));
    }

    componentDidMount() {
        this.checkCurrentAdmin();
        this.fetchAdminData();
    }

    onClinkNavLink = (page) => {
        this.setState({currentPage: page});
    }

    render() {
        return(
            <div>
                <Nav currentPage={this.state.currentPage} onClickNavLink={this.onClinkNavLink} />
                {this.state.currentPage === 'admin' && <Admin/>}
                {this.state.currentPage === 'staff' && <Staff/>}
                {this.state.currentPage === 'permissions' && <Permission/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);