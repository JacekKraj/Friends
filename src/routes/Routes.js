import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import Home from './../components/home/Home';
import AuthenticationMainPage from '../components/authentication/authenticationMainPage/AuthenticationMainPage';

const UserProfile = React.lazy(() => {
  return import('./../components/userProfile/UserProfile');
});

const FriendsPage = React.lazy(() => {
  return import('./../components/friendsPage/FriendsPage');
});

const ChatPage = React.lazy(() => {
  return import('./../components/chatPage/ChatPage');
});

const NoFound = React.lazy(() => {
  return import('./../components/errorPage/nofound/Nofound');
});

const NoAccess = React.lazy(() => {
  return import('./../components/errorPage/noAccess/NoAccess');
});

const Routes = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <Switch>
      <Route path='/' exact render={() => <Home />} />
      <Route path='/users' exact render={() => <UserProfile />} />
      <Route path='/chat' exact render={() => <ChatPage />} />
      <Route path='/friends' exact render={() => <FriendsPage />} />
      <Route path='*' render={() => <NoFound />} />
    </Switch>
  ) : (
    <Switch>
      <Route path='/' exact render={() => <AuthenticationMainPage />} />
      <Route path='/chat' render={() => <NoAccess />} />
      <Route path='/users' render={() => <NoAccess />} />
      <Route path='/friends' render={() => <NoAccess />} />
      <Route path='*' render={() => <NoFound />} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(Routes);
