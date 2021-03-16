import logo from './logo.svg';
// import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useEffect } from 'react'  
import { useDispatch } from 'react-redux'
// import Test from './component/test' ;
import Login from "./pages/Login"   ;
import Dashboard from "./pages/Dashboard" ;
import Detail from "./pages/Detail" ; 
import PublicRoute from './component/PublicRoute' ;
import PrivateRoute from './component/PrivateRoute' ;

import { AuthService } from './services/AuthService'

function App() {

  const dispatch = useDispatch() 
  
  useEffect( () => { AuthService.check(dispatch) })

  return (
    
    <Router>

      <Switch>

        <PublicRoute   component={Login}        path='/login'      exact restricted={true}/>
        <PrivateRoute  component={Dashboard}    path='/'           exact/>
        <PrivateRoute  component={Detail}       path='/detail/:id' exact/>

      </Switch>

    </Router>

  );
}

export default App;
