import React, {Component} from 'react';
import PropTypes from 'prop-types';
const axios = require('axios');

class PermissionsGithub extends Component {
    static propTypes = {
        email: PropTypes.string.isRequired
    }

    state = {
        hasAccess: false,
        pendingAccess: false
    }

    componentDidMount() {

    }

    giveAccess() {

    }

    revokeAccess() {
        
    }

    render() {

    }
}

export default PermissionsGDrive;