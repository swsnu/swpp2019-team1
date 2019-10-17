import React from 'react';
import './App.css';

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Header from './containers/Header/Header';
import Footer from './containers/Footer/Footer';
import HomePage from './containers/HomePage/HomePage';
import Search from './containers/Search/Search';
import MatchCreate from './containers/Match/MatchCreate/MatchCreate';
import MatchDetail from './containers/Match/MatchDetail/MatchDetail';
import LoginForm from './containers/Login/LoginForm';
import Register from './containers/Register/Register';
import UserProfile from './containers/UserProfile/UserProfile';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Header />
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/search" exact component={Search} />
        <Route path="/match/create" exact component={MatchCreate} />
        <Route path="/match/:id" exact component={MatchDetail} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={UserProfile} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </ConnectedRouter>
  );
}

export default App;
