
import './App.css';
import Schedule from './Schedule.js';
import React from 'react';
import SignIn from './SignIn.js';
import Classes from './Classes.js'
import SignUp from './SignUp.js';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Schedule}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/classes" component={Classes}></Route>
      </Switch>
    </Router>
  );
}

export default App;
