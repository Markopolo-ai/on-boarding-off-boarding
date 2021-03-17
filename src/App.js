import React, {Component, useState} from 'react';
import User_list from './user_list';
class App extends Component {

  constructor(props) {

    super(props);
    this.state = { 
      value : '' ,   
      emails: ['alan'],
      arrayLength: 0,
      userName: ''
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    // console.log(event.target.value);
    this.setState({value: event.target.value});

  }

  handleClick(event){

    if(localStorage.getItem('mail_list') !== null)
    {
      var storedItems = JSON.parse(localStorage.getItem('mail_list'));

      console.log('pagla' + storedItems.length);
      this.setState({emails: storedItems});

    }
  }

  handleSubmit(event) {
    this.setState({value: event.target.value});

    if(localStorage.getItem('mail_list') !== null)
    {
      console.log('status'+ this.state.emails.length);
      let mails =[];
      if(this.state.arrayLength === 1)
      {
        mails = [this.state.emails, this.state.value];
        this.setState({arrayLength: this.state.arrayLength+1});
      } 
      else
      {
        mails = [...this.state.emails, this.state.value];
      } 
      localStorage.setItem('mail_list',  JSON.stringify(mails));

    }

    if(localStorage.getItem('mail_list') === null)
    {
      console.log('nullitem');
      this.setState({emails: JSON.stringify(this.state.value)});
      this.setState({arrayLength: 1});
      localStorage.setItem('mail_list',  JSON.stringify(this.state.value));

    }

    if(localStorage.getItem('arrayLength')===null){
      event.preventDefault();
      localStorage.setItem('arrayLength',1)
    }

    
    this.setState({value: ''});

  }

  giveAccess(email){
    console.log(email);
    fetch('https://api.github.com/search/users?q=' + email) //this will get the username of the user first with the email addresss submitted
    .then(res => res.json())
    .then( (data) =>{
      console.log(data);
      //the next fetch will now give access to the reposiroty. I am using here one of my private reosiroty. I am giving my access token here in
      //Bearer token section. [token is changed for security.]
      fetch('https://api.github.com/repos/Mustafiz48/No_one_should_know/collaborators/'+ data.items[0].login,{
        method: 'put', 
        headers: new Headers({
          'Authorization': 'Bearer '+'personal access token here', 
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/vnd.github.v3+json',
          'permission': 'push'
        }),
      })
      .then(response => {
        console.log('aha'+ response.statusText);
        alert('Status' + response.status);
        response.json();
      })
    })

  }


  removeAccess(email){
    console.log(email);
    fetch('https://api.github.com/search/users?q=' + email) //this will get the username of the user first with the email addresss submitted
    .then(res => res.json())
    .then( (data) =>{
      console.log(data);
      //the next fetch will now give access to the reposiroty. I am using here one of my private reosiroty. I am giving my access token here in
      //Bearer token section. [token is changed for security.]
      fetch('https://api.github.com/repos/Mustafiz48/No_one_should_know/collaborators/'+ data.items[0].login,{
        method: 'delete', 
        headers: new Headers({
          'Authorization': 'Bearer '+'personal access token here', 
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/vnd.github.v3+json',
          'permission': 'push'
        }),
      })
      .then(response =>{
      alert('Status:' + response.status);
      })
    })
  }

  render() {
  return (
    <div className="App frame">
        <div className="text_st">
         Enter Email
        </div>
        <form onSubmit={this.handleSubmit} >
          <input className="input_box" name ='value' type="text" value={this.state.value } onChange={this.handleChange} />
          <button className="btns btn-outline-secondary" type="submit" value="Submit" onClick={this.handleClick}>Submit</button>
         
{/* <input type="submit" value="Submit"/> */}
      </form>
      <div className='list'>
          <User_list emails = {this.state.emails} giveAccess={this.giveAccess} removeAccess={this.removeAccess}/>
      </div>
    </div>
  );
}
}
export default App;
