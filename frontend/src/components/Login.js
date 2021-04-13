import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';

import M from 'materialize-css';
import {updateLoginStatus} from '../actions/index';

class Login extends Component {
    state = {
        email: "",
        password: "",
        remember: false,
        success: false,
        error: null
    }

    // Initializes JavaScript necessary for Materialize.css forms.
    componentDidMount() {
        M.AutoInit();
    }

    // Logs in the current user and updates success state to true, which
    // in turn, redirects the user to the root url and admin dashboard.
    login = () => {
        let api_url = "http://localhost:80/api/admins/login";
        axios({
            method: 'post',
            url: api_url,
            data: {
                email: this.state.email,
                password: this.state.password,
                remember: this.state.remember
            }
        })
        .then(resp => {
            if (resp.data.status === "success") {
                this.props.updateLoginStatus({loggedIn: true});
                this.setState({success: true});
                M.toast({
                    html: `Successfully logged in as ${this.state.email}`,
                    classes: "rounded"}
                    );
            }
        })
        .catch(err => {
            this.setState({error: err.response.data.message});
        })
    }

    handleSubmit = (event) => {
        this.login();
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

    // Renders login form. If the user is already logged in or the login
    // was successful, redirects to the root url.
    render() {
        if (this.props.loggedIn || this.state.success) {
            return <Redirect to="/dashboard" />
        } else {
            return (
                <div id="login-form" className="container">
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <h1>Login</h1>
                            <hr/>
                        </div>
                    </div>
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
                                    <input type="checkbox" id="remember" name="remember" onChange={this.handleChange} className="filled-in" checked={this.state.remember} />
                                    <span>Remember Me</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);