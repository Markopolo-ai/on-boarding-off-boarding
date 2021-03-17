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

    constructor(props) {
        super(props);
        this.getAdmin = this.getAdmin.bind(this);
    }

    async getAdmin() {
        try {
            let get_id_url = "http://localhost:80/api/admins/login";
            let resp = await axios({
                method: 'get',
                url: get_id_url
            });
            console.log(resp);
            this.props.updateAdminData({
                id: resp.data.id,
                email: null,
                isSuperAdmin: null
            });

            let get_admin_url = `http://localhost:80/api/admins/${this.props.id}`;
            resp = await axios({
                method: 'get',
                url: get_admin_url
            })
            console.log(resp);
            this.props.updateAdminData({
                id: resp.data.data.id,
                email: resp.data.data.email,
                isSuperadmin: resp.data.data.is_superadmin
            });
        } catch (err) {
            alert(err.response.data.message);
        }
    }

    componentDidMount() {
        this.getAdmin();
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