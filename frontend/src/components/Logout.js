import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';

import {updateLoginStatus} from '../actions/index';

class Logout extends Component {
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
            }
        })
        .catch(err => {
            this.setState({error: err.response.data.message});
        })
    }

    render() {
        return (
            <button className="btn-large red darken 4 white-text" onClick={this.logout}>Logout</button>
        )
        // if (this.state.success || !this.props.loggedIn) {
        //     return <Redirect to="/" />
        // } else {
        //     return (
        //         <button className="btn-large red darken 4 white-text" onClick={this.logout}>Logout</button>
        //     )
        // }
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout);