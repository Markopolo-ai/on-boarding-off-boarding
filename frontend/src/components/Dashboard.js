import React, {Component} from 'react';
import { Redirect, Route, Switch } from 'react-router';
import {connect} from 'react-redux';
import axios from 'axios';

import Nav from './Nav';
import Admin from './Admins';
import AdminForm from './AdminForm';
import Staff from './Staffs';
import Permission from './Permissions';
import { updateLoginStatus, updateAdminAccessToken, updateAdminData } from '../actions';

/**
 * Dashboard is the main component that will render all the features of
 * the application to the logged-in admins.
 */
class Dashboard extends Component {
    state = {
        currentPage: "admins",
        adminLoaded: false
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
            this.fetchAdminData(resp.data.id);
        })
        .catch(error => console.log(error));
    }

    fetchAdminData = (id) => {
        let api_url = `http://localhost:80/api/admins/${id}`;
        axios({
            method: 'get',
            url: api_url
        })
        .then(resp => {
            let {id, email, is_superadmin} = resp.data.data;
            this.props.updateAdminData({
                id: id,
                email: email,
                isSuperAdmin: is_superadmin
            });
            this.setState({adminLoaded: true});
        })
        .catch(error => console.log(error));
    }
    
    componentDidMount() {
        this.checkCurrentAdmin();
    }

    onClinkNavLink = (page) => {
        this.setState({currentPage: page});
    }

    render() {
        return(
            <div>
                <Nav currentPage={this.state.currentPage} onClickNavLink={this.onClinkNavLink} />
                
                <Switch>
                    <Route path={`${this.props.match.url}/admins`} component={Admin} />
                    <Route path={`${this.props.match.url}/staffs`} component={Staff} />
                    <Route path={`${this.props.match.url}/permissions`} component={Permission} />
                </Switch>

                {this.state.adminLoaded && <Redirect to={`${this.props.match.url}/admins`} />}
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