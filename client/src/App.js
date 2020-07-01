import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  Box,
  Grommet,
  Heading,
  Button,
} from 'grommet';
import history from './history'

import axios from 'axios';

import Main from './main';
import Signin from './signin';
import Signup from './signup';
import Home from './home';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
    },
  },
}

 class App extends React.Component {

  componentWillMount() {
    console.log(localStorage.token)
    if(localStorage.token) axios.defaults.headers.common['Authorization'] = localStorage.token; 
  }
 
  render() {
    return (
      <Grommet style={{height: '100%'}} theme={theme} >
        
        <Box fill="vertical" align="center" background="neutral-2">
        <Router history={history}>
            
            <Switch>
              <Route exact path="/">
                {localStorage.fullName ? <Redirect to="/home" /> : <Main />}
              </Route>

              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/home" component={Home} />

            </Switch>
        </Router>
        </Box>
      </Grommet>
    )
  }
}
export default App;