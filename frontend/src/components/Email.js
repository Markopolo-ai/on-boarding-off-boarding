import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Email extends Component {
    static propTypes = {
        email: PropTypes.string.isRequired,
        onDeleteEmail: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="email">
                <p>{this.props.email}</p>
                <button className="email-remove" onClick={() => this.props.onDeleteEmail(this.props.email)}>Remove</button>
            </div>
        )
    }
}

export default Email;
