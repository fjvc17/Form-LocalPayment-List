import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';

export const AuthRouter = () => {

  const [registerData, setRegisterData] = useState([]);

  const registerUser = (values) => {
    setRegisterData([...registerData, values])
  }
  
  const loginData = (username, pass) => {
    let shouldLogin = false;
    registerData.forEach(user => {
      if(username === user.usuario && pass === user['contraseña']) {
        shouldLogin = true
      } 
    })
    return shouldLogin;
  }

  return (
    <div>
      <Switch>
        <Route path="/auth/login">
          <LoginScreen loginData={loginData} />
        </Route>
        <Route path="/auth/register">
          <RegisterScreen registerUser={registerUser} />
        </Route>
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  )
}
