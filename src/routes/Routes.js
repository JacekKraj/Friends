import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

import Home from './../components/home/Home';
import AuthenticationMainPage from '../components/authentication/authenticationMainPage/AuthenticationMainPage';
import UserProfile from './../components/userProfile/UserProfile';

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

const Routes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

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

export default Routes;
