import React, { Component } from 'react';
import './ApprovedItem.css';


class ApprovedItem extends Component {
    constructor(props) {
        super(props);

        this.handleRevoke = this.handleRevoke.bind(this);

    }
    
    callAPI() {
        fetch("http://localhost:9000/revokePerm/"+this.props.mailId)
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    handleRevoke(event) {
        this.callAPI();
        alert('Revoking permission from ' + this.props.mailId);
        const data = localStorage.getItem("all-mail-ids");
        const allMailIds = JSON.parse(data);
        const idx = allMailIds.indexOf(this.props.mailId);
        if(idx > -1) allMailIds.splice(idx, 1);
        localStorage.setItem("all-mail-ids", JSON.stringify(allMailIds));


        this.forceUpdate();
    }



    render() {
        return (
            <div className="ItemWrapper">
                <div className="MailId">
                    <p>{this.props.mailId}</p>

                </div>
                <div className="MailButtonWrapper">
                    <button className="MailButton" onClick={this.handleRevoke}>Revoke Access</button>

                </div>
            </div>


        );
    }
}





export default ApprovedItem;