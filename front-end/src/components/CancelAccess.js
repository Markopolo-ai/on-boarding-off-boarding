import { Segment, Container, Button,Input, Header, List,Image } from "semantic-ui-react";
import React from 'react';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class CancelAccess extends React.Component{


  headers = {
    Authorization: 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN,
    Accept: 'application/vnd.github.v3+json'
  }

  constructor(){
    super();
    this.state = {
      username : '',
      repos: []
    }
    this.getRepos();

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getRepos = async () => {
    let data = await axios.get('https://api.github.com/orgs/Orfiaj-Org/members?role=member', {
      headers: this.headers
    }).then(
      ({data}) => data
    );
    this.setState({repos: data});
    
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.username);
    
    axios.delete(`https://api.github.com/orgs/Orfiaj-Org/members/${this.state.username}`, {
      headers: this.headers,
      data: {}
    }).then(
      res => console.log(res),
      NotificationManager.success(this.state.username + ' has been deleted!', 'Deleted')
    ).catch((e) => {
      NotificationManager.error('Something went Wrong!', 'Invitation not Sent')
    });

    this.getRepos();
  }

  handleInputChange(event) {
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    let listItems;
    if(this.state.repos.length > 0){
      listItems = <List style={{width: "200px", margin:"30px auto "}}>
      {this.state.repos.map(repo => <List.Item textAlign="center" style={{ fontSize : "30px"}}  icon='user' content={repo.login}/>)} 
    </List>;
    }
    else{
      listItems = 'No user found';
    }
    
    const {username} = this.state;
    
    return (
      <Container style={{ marginTop: "5em" }} textAlign='center' text>

          <Container textAlign='center' fluid style={{marginBottom: "40px"}}>
          <Header icon  style={{ fontSize: '50px', marginBottom: "30px" }}>
              Remove Existing Employee
            </Header>

          <Header fontSize="20px" >
            Employee List:
          </Header>
            <p style={{color: "red", fontWeight: "bold"}}>{listItems}</p>
          </Container>
  
    
            <form onSubmit={this.submitHandler}>
              <Input 
              placeholder="Enter employee github username..." 
              size="large"  
              style={{ maxWidth: "500px",width:"500px" }} 
              value={username}
              name="username"
              onChange={this.handleInputChange}
              />
              <Button 
              color='red' 
              style={{ marginTop: "25px",maxWidth: "500px",width:"500px", fontSize: '20px' }} 
              icon='location arrow'
              >
                Revoke Access
              </Button>
            </form>
            <NotificationContainer/>
        </Container>
    );
  }
};

export default CancelAccess;
