import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomeScreen from "../components/HomeScreen";
import { AuthRouter } from "./AuthRouter";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>

          <Route path="/auth" component={ AuthRouter } />

          <Route path="/home" component={ HomeScreen } />

          <Redirect to="/auth/login" />

        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
