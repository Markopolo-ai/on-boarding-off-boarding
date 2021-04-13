import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import M from 'materialize-css';
import { updateLoginStatus, updateAdminAccessToken, updateAdminData } from '../actions';

/**
 * This form is used for both creating and editing Admins.
 */
class AdminForm extends Component {
    state = {
        id: null,
        email: "",
        password: "",
        is_superadmin: false,
        error: null
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            let api_url = `http://localhost:80/api/admins/${id}`;
            axios({
                method: 'get',
                url: api_url
            })
            .then(resp => {
                let {id, email, password, is_superadmin} = resp.data.data;
                this.setState({
                    id: id,
                    email: email,
                    is_superadmin: is_superadmin,
                    password: password
                });
            })
            .catch(error => console.log(error));
        }
        M.AutoInit();
    }

    editAdmin = () => {
        let api_url = `http://localhost:80/api/admins/edit/${this.props.match.params.id}`;
        axios({
            method: 'put',
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
                this.props.onEdit();
                this.props.history.goBack();           
            }
        })
        .catch(err => {
            this.setState({error: err.response.data.message});
        })
    }

    addAdmin = () => {
        let api_url = "http://localhost:80/api/admins/add";
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
                M.toast({html: 'Added Successfully'});
                this.props.onAdd();
                this.props.history.goBack();
            }
        })
        .catch(err => {
            this.setState({error: err.response.data.message});
        })
    }

    closeEditPanel = () => {
        this.props.history.goBack();
    }

    handleSubmit = (event) => {
        if (this.props.match.params.id) {
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
        let buttonName = this.props.match.params.id? "Edit" : "Add";
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
                            <input value={this.state.email} id="email" onChange={this.handleChange} name="email" type="text"/>
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
                                <input type="checkbox" id="is_superadmin" name="is_superadmin" onChange={this.handleChange} className="filled-in" checked={this.state.is_superadmin} />
                                <span>Is Superadmin</span>
                            </label>
                            </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m6 offset-m3">
                            <button className="btn-large teal darken 4 white-text" type="submit" onSubmit={this.handleSubmit}>{buttonName}</button>
                            <button className="btn-large red darken 4 white-text" type="close" onClick={this.closeEditPanel}>Close</button>
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