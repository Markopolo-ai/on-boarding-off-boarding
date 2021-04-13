import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import AdminForm from './AdminForm';
import { updateLoginStatus, updateAdminAccessToken, updateAdminData } from '../actions';

class Admin extends Component {
    state = {
        admins: null
    }

    onAddedAdmin = (admin) => {
        this.getAllAdmins();
    }

    getAllAdmins = () => {
        let api_url = 'http://localhost:80/api/admins';
        axios({
            method: 'get',
            url: api_url
        })
        .then(resp => {
            if (resp.data.status === "success") {
                this.setState({admins: resp.data.data});
            }
        })
        .catch(err => {
            console.log(err.response.data.message);
        })
    }

    removeAdmin = (id) => {
        let api_url = `http://localhost:80/api/admins/${id}`;
        axios({
            method: 'DELETE',
            url: api_url
        })
        .then(resp => {
            if (resp.data.status === "success") {
                M.toast({html: "Admin deleted"});
                this.getAllAdmins();
            }
        })
        .catch(err => {
            M.toast({html: err.response.data.message})
        })
    }

    componentDidMount() {
        this.getAllAdmins();
    }

    render() {
        return(
            <div className="container">
                <h3>Welcome {this.props.email}</h3>
                <hr/>
                <div className="edit-admin">
                    <Link to={`${this.props.match.url}/edit/${this.props.id}`} className="waves-effect waves-light btn teal darken-4">Edit Your Information</Link>
                    <br/>
                    <Link to={`${this.props.match.url}/add`} className="waves-effect waves-light btn teal darken-4">Add Admins</Link>
                    
                    <Route
                        path={`${this.props.match.url}/edit/:id`} 
                        render={(props) => (
                        <AdminForm {...props} onEdit={this.onAddedAdmin} />
                    )} />
                    <Route
                        path={`${this.props.match.url}/add`} 
                        render={(props) => (
                        <AdminForm {...props} onAdd={this.onAddedAdmin} />
                    )} />
                </div>
                <div className="list-admins">
                    <h4>Admin Panels</h4>
                    <hr />
                    {this.state.admins && this.state.admins.map((admin, index) => {
                        return(
                            <div className="item-admin" key={admin.id}>
                                <p>{admin.email}</p>
                                <Link to={`${this.props.match.url}/edit/${admin.id}`} className="waves-effect waves-light btn teal darken-4">Edit</Link>
                                <Link to="#" className="waves-effect waves-light btn red darken-4" onClick={() => this.removeAdmin(admin.id)}>Remove</Link>
                            </div>
                        )
                    })}
                </div>
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