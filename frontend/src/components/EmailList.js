import React, {Component} from 'react';
import Email from './Email';

class EmailList extends Component {
    state = {
        emails: ["musabbirhasansammak@gmail.com", "musabbirhasansammak@outlook.com"]
    }

    addEmail(email) {
        this.setState((prevState) => ({
            emails: prevState.emails.add(email)
        }))
    }

    removeEmail(email) {
        this.setState((prevState) => ({
            emails: prevState.emails.filter((e) => e !== email)
        }))
    }

    render() {
        return (
            <div className="email-list">
                {this.state.emails.map((e) => (
                    <Email email={e} onDeleteEmail={this.removeEmail} />                    
                ))}
            </div>
        )
    }
}

export default EmailList;
