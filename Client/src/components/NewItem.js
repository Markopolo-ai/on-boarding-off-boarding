import React, { Component } from 'react';
import ApprovedList from './ApprovedList';
// import { all } from '../../../api/app';
import './NewItem.css';

class NewItem extends Component {
    constructor(props) {
        super(props);
        const data = localStorage.getItem("all-mail-ids");
        let allMailIds = [];
        if(data) allMailIds = JSON.parse(data);
        this.state = { mailId: '', allMailIds };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    callAPI() {
        fetch("http://localhost:9000/grantPerm/"+this.state.mailId)
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    handleChange(event) {
        this.setState({ mailId: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.callAPI();
        alert('Granting permission to ' + this.state.mailId);

        const allMailIds = this.state.allMailIds;
        console.log(this.state.allMailIds);
        allMailIds.push(this.state.mailId);
        this.setState({allMailIds:allMailIds});
        
        localStorage.setItem("all-mail-ids", JSON.stringify(allMailIds));
        
        this.props.handleAdded();
    }

    render() {
        return (
            <div>
                <form className="NewItemWrapper" onSubmit={this.handleSubmit}>
                    <input
                        className="NewMailId"
                        type="text"
                        name="name"
                        placeholder="new email address"
                        onChange={this.handleChange} />
                    <div className="NewMailButtonWrapper">
                        <input
                            className="NewMailButton"
                            type="submit"
                            value="Grant Access" />

                    </div>
                </form>
            </div>
        );
    }
}





export default NewItem;