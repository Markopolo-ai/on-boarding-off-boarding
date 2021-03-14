import React, {Component} from 'react';

class EmailForm extends Component {
    state = {
        email: ""
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }
    
    addEmail() {
        
    }

    render() {
        <form>
            <input type="text" value={this.state.email} onChange={this.handleChange} onSubmit={this.addEmail} />
        </form>
    }
}