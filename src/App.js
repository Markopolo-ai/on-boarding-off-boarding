import React, {Component} from 'react';

class App extends Component {

  
  constructor(props) {

    super(props);
    this.state = { 
      value : '' ,   
      emails: ['mustafji48@gmail.com','m.zuwel@gmail.com']
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});

  }

  handleSubmit(event) {
   this.setState({value: event.target.value});
    console.log('Email submitted is : ' + this.state.value);
    console.log('string:' + JSON.stringify(this.state.emails));
    localStorage.setItem('mail_list',  JSON.stringify(this.state.emails));

    event.preventDefault();
    
    this.setState({value: ''});
    console.log('ahare!');
    var storedItems =JSON.parse(localStorage.getItem('mail_list'));
    console.log('soterd :' + storedItems);
    localStorage.clear();

  }

  render() {
  return (
    <div className="App frame">
        <div className="text_st">
         Enter Your Email
        </div>
        <form onSubmit={this.handleSubmit} >
          <input className="input_box" name ='value' type="text" value={this.state.value } onChange={this.handleChange} />
{/* =         <input type="submit" value="Submit"/> */}
      </form>
    </div>
  );
}
}
export default App;