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
import SignInForm from './containers/SignIn/SignInForm';
import SignUp from './containers/SignUp/SignUp';
import UserProfile from './containers/UserProfile/UserProfile';

function App(props) {
  const { history } = props;
  return (
    <ConnectedRouter history={history}>
      <Header />
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/search" exact component={Search} />
        <Route path="/match/create" exact component={MatchCreate} />
        <Route path="/match/:id" exact component={MatchDetail} />
        <Route path="/signin" exact component={SignInForm} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/profile" exact component={UserProfile} />
        <Redirect from="/" to="/home" />
      </Switch>
      <Footer />
    </ConnectedRouter>
  );
}

export default App;
