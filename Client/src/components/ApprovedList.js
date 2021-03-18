import React, { Component } from 'react';
import ApprovedItem from './ApprovedItem';
import './ApprovedList.css';

class ApprovedList extends Component {
    constructor(props) {
        super(props);
        const data = localStorage.getItem("all-mail-ids");
        let allMailIds = [];
        if(data) allMailIds = JSON.parse(data);
        this.state = { allMailIds };
    }

    updateList() {
        this.forceUpdate();
    }

    render() {
        return (
            <div className="ListWrapper">
                {this.state.allMailIds.map(mailId => (
                    <ApprovedItem mailId={mailId} />
                ))}
                

            </div>
        );
    }
}



export default ApprovedList;