import React from 'react';
import './App.css';

import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import Header from './containers/Header/Header';
import Footer from './containers/Footer/Footer';
import HomePage from './containers/HomePage/HomePage';
import Search from './containers/Search/Search';
import MatchCreate from './containers/Match/MatchCreate/MatchCreate';
import MatchDetail from './containers/Match/MatchDetail/MatchDetail';
import MatchEdit from './containers/Match/MatchDetail/MatchEdit/MatchEdit';
import SignIn from './containers/User/Auth/SignIn/SignIn';
import SignUp from './containers/User/Auth/SignUp/SignUp';
import UserProfile from './containers/User/UserProfile/UserProfile';
import UserProfileEdit from './containers/User/UserProfile/UserProfileEdit/UserProfileEdit';

function App(props) {
  const { history } = props;
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <div className="extra" />
        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/search" exact component={Search} />
          <Route path="/match/create" exact component={MatchCreate} />
          <Route path="/match/:id/edit" exact component={MatchEdit} />
          <Route path="/match/:id" exact component={MatchDetail} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/profile/:id" exact component={UserProfile} />
          <Route path="/profile/:id/edit" exact component={UserProfileEdit} />
          <Redirect from="/" to="/home" />
        </Switch>
        <div className="extra" />
        <div className="extra" />
        <Footer />
      </ConnectedRouter>
    </div>
  );
}
App.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};
export default App;
