import React from 'react';
import './App.css';

import {
  Router,
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
import Note from './note';


const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
    },
  },
}

 class App extends React.Component {

  state = {

  }
  componentWillMount() {
    if(localStorage.token) axios.defaults.headers.common['Authorization'] = localStorage.token; 
  }
  
 
  render() {
    return (
      <Grommet theme={theme} >
        <Box flex="grow" fill="vertical" align="center" background="neutral-2" style={{minHeight: '100vh'}}>
        <Router history={history}>

            <Switch> 
              <Route exact path="/" component={Main} />

              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/home" component={Home} />
              <Route path="/w/:id" component={Note} />

            </Switch>
        </Router>
        </Box>
      </Grommet>
    )
  }
}
export default App;