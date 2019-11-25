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

function App(props) {
  const { history } = props;
  return (
    <div className="App" style={{ backgroundColor: '#ffdddd' }}>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/search" exact component={Search} />
          <Route path="/match/create" exact component={MatchCreate} />
          <Route path="/match/:id/edit" exact component={MatchEdit} />
          <Route path="/match/:id" exact component={MatchDetail} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/profile/:id" exact component={UserProfile} />
          <Redirect from="/" to="/home" />
        </Switch>
        <Footer />
      </ConnectedRouter>
    </div>
  );
}
App.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};
export default App;
