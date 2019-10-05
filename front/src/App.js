import React from 'react';
import './App.css';

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Header from './components/Header/Header';
import Login from './components/Login/Login';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Header />
      <Switch>
        <Route path='/login' component={Login}/>
        <Redirect from='/' to='/login'/>
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
