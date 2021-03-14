import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Header from './components/header/header-section.jsx';
import EmployeeList from './components/employee/employee-list.jsx';
import  AddEmployee from './components/employee/add-employee.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

const App = props => {
    const [search, setSearch] = useState("");
    const [activepage, setActivepage] = useState('home');

    const pathName = window.location.pathname;
    const token = document.cookie || '';

  return <div className="container-fluid">
       <BrowserRouter>
        <Header search={setSearch} selectActivePage={setActivepage} activepage={pathName && pathName!== '/' ? pathName.replace('/', '') : activepage}/>
        <Switch>
          <Route path='/'  render={() =>  <EmployeeList /> }/> 
          <Route path='/add-employee'  render={() => <AddEmployee /> }/> 
          {/* <Route path='/signin'  render={() => <Login /> }/>  */}
        </Switch>
      </BrowserRouter>
  </div>;
};

export default App;