import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import {updateLoginStatus} from './actions';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

/**
 * This is the entry point of the application. Upon entry, it
 * checks whether the current user is logged in or not. If not
 * logged in, it routes the user to the login page. Otherwise,
 * it routes the user to the admin dashboard.
 */
class App extends Component {
    /**
    * Gets the current session's login status and sets it as the
    * loggedIn variable in the application's redux store.
    * 
    * TODO: Gracefully handle error!
    */
    refreshLoginStatus = () => {
        let api_url = "http://localhost:80/api/admins/login";
        axios({
            method: 'get',
            url: api_url
        })
        .then(resp => {
            this.props.updateLoginStatus({loggedIn: resp.data.loggedIn});
        })
        .catch(error => console.log(error));
    }

    /**
     * After mounting the component, it checks whether the user is
     * logged in or not.
     */
    componentDidMount() {
        this.refreshLoginStatus();
    }

    /**
     * Based on the current redux state of loggedIn variable, it either
     * returns the login view, or leads to the admin dashboard for the
     * root url.
     */
    render() {
        return (
            <div>
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />

                {this.props.loggedIn
                    ? <Redirect to="/dashboard" />
                    : <Redirect to="/login" />}
            </div>
        )
   }
}

// This component requires only the loggedIn state from the global
// redux store.
function mapStateToProps({login, admin}) {
    return {
        loggedIn: login.loggedIn
    }
}

// This component requires only the UPDATE_LOGIN_STATUS action to
// modify loggedIn state of the current user.
const mapDispatchToProps = (dispatch) => {
    return {
        updateLoginStatus: (data) => dispatch(updateLoginStatus(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
