import React, {useContext} from 'react';
import SignInPage from './pages/sign-in/sign-In.component';
import HomePage from './pages/home/home.component';
import { UserContext } from './context/userContext';
import APIProvider from './context/apiContext';

import './App.scss';

export default function App() {
  const {user} = useContext(UserContext);
  return (
    <div className ='app'>
      {user ?
        <APIProvider>
          <HomePage/>
        </APIProvider>
        :
        <SignInPage/>
      }
    </div>
  )
}

