import {  Container, Button, Header, Input,Checkbox,Icon } from "semantic-ui-react";
import React  from 'react'
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class GetAccess extends React.Component{
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.REACT_APP_ACCESS_TOKEN
  }
  baseUrl = 'https://api.github.com/orgs/' + process.env.REACT_APP_ORG_NAME + '/invitations';
  constructor(){
    super();
    this.state = {
      email : '',
      github: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  inviteUser = async () => {
      let data = await axios.post(this.baseUrl, 
      {
        'email': this.state.email
      }, {
        headers: this.headers
      }).then(
        res => console.log(res)
      )      
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.baseUrl);
    
    axios.post('https://api.github.com/orgs/Orfiaj-Org/invitations', 
    this.state
    , {
      headers: this.headers
    }).then(
      res => console.log(res),
      NotificationManager.success(this.state.email + ' has been invited!', 'Invitation Sent')
    ).catch((e) => {
      NotificationManager.error('Something went Wrong!', 'Invitation not Sent')
    })
  }

  // changeHandler = (e) => {
  //   this.setState({ [e.target.name] : e.target.value})
  // }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  

  render(){
    const {email} = this.state;
    return (  
      <Container style={{ marginTop: "5em" }} textAlign='center' text>
  
          <Header icon  style={{ fontSize: '50px', marginBottom: "30px" }}>
            Add New Employee
          </Header>
  
          <form onSubmit={this.submitHandler}>
            <Input 
            placeholder="Enter employee e-mail address..." 
            size="large"  
            style={{ maxWidth: "500px",width:"500px" }} 
            name="email" 
            value={email}
            onChange={this.handleInputChange}
            
            />
            <Container style={{marginTop: "30px"}}> 
              <Header size='medium' >Allow access to:</Header>
              <Checkbox 
              label='Github' 
              style={{marginRight: '15px'}}
              name="github" 
              // checked={this.state.github}
              onChange={this.handleInputChange}
              />
              <Checkbox label='Google Drive' style={{marginRight: '15px'}}/>
              <Checkbox label='Trello' />
            </Container>
            <Button type="submit" color='green' style={{ marginTop: "25px",maxWidth: "500px",width:"500px", fontSize: '20px' }} icon='location arrow'>
              Add To Organization
            </Button>
          </form>
           <Header as='h5'>
          {/* {this.state.repos.map(repo => <p>{repo.login}<button onClick={() => this.deleteUser(repo.login)}>X</button></p>)} */}
          {/* {this.state.repos.name} */}
          </Header>
          <NotificationContainer/>
      </Container>
      
      
    );
  }
}

export default GetAccess;
