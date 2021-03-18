import React, { Component } from 'react';
import './App.css';
import NewItem from './NewItem';
import ApprovedList from './ApprovedList';

class App extends Component {
  constructor(props) {
    super(props);
  }



  handleAdded() {
    console.log('added...');
  }

  render() {
    return (
      <div>
        <div className="Wrapper">
          <h3>Approve new Email Address</h3>
          <NewItem handleAdded={this.handleAdded} />
          <div className="Space-50"></div>
          <h3>List of Approved Email Addresses</h3>
          <ApprovedList />

        </div>
      </div>
    );
  }
}


export default App;
