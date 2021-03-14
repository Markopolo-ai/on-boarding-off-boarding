import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Welcome from './components/Welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Route exact path="/" render={() => (
          <div>
              <h1>Please select the platforms below</h1>
              <Welcome />
          </div>
      )}/>
      <Route path="/authentication" component={Welcome}/>
      </div>
    );
  }
}

export default App;
