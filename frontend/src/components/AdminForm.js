import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import M from 'materialize-css';
import { updateLoginStatus, updateAdminAccessToken, updateAdminData } from '../actions';

class AdminForm extends Component {
    state = {
        id: null,
        email: "",
        password: "",
        is_superadmin: false,
        error: null
    }

    componentDidMount() {
        if (this.props.action === 'edit') {
            let api_url = `http://localhost:80/api/admins/${this.props.editId}`;
            axios({
                method: 'get',
                url: api_url
            })
            .then(resp => {
                let {id, email, is_superadmin} = resp.data.data;
                this.setState({
                    id: id,
                    email: email,
                    isSuperadmin: isSuperAdmin
                });
            })
            .catch(error => console.log(error));
        }
        M.AutoInit();
    }

    editAdmin = () => {
        let api_url = `http://localhost:80/api/admins/edit/${this.props.editId}`;
        axios({
            method: 'post',
            url: api_url,
            data: {
                email: this.state.email,
                password: this.state.password,
                is_superadmin: this.state.is_superadmin
            }
        })
        .then(resp => {
            if (resp.data.status === "success") {
                M.toast({html: 'Edited Successfully'});
            }
        })
        .catch(err => {
            this.setState({error: err.response.data.message});
        })
    }

    addAdmin = () => {

    }

    handleSubmit = (event) => {
        if (this.props.action === 'edit') {
            this.editAdmin();
        } else {
            this.addAdmin();
        }
        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox'? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {this.state.error !== null && (
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card-panel red darken-4 white-text">{this.state.error}</div>
                        </div>
                    </div>
                )}
                    <div className="row">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12 m6 offset-m3">
                                <input value={this.state.email} id="email" onChange={this.handleChange} name="email" type="text" placeholder=""/>
                                <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m6 offset-m3">
                                <input value={this.state.password} id="password" name="password" onChange={this.handleChange} type="password" />
                                <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m6 offset-m3">
                                <p>
                                <label>
                                    <input type="checkbox" id="is_superadmin" name="is_superadmin" onChange={this.handleChange} className="filled-in" checked={this.state.remember} />
                                    <span>Is Superadmin</span>
                                </label>
                                </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12 m6 offset-m3">
                                <button className="btn-large teal darken 4 white-text" type="submit" onSubmit={this.handleSubmit}>Login</button>
                                </div>
                            </div>
                        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);