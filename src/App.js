import React, { useState, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import * as actions from './actions/index';
import fire from './firebaseConfig';
import AuthenticationMainPage from './components/authentication/authenticationMainPage/AuthenticationMainPage';
import { failToast, successToast } from './utilities/toasts/toasts';
import Home from './components/home/Home';
import Spinner from './components/UI/spinner/Spinner';
import { modifyEmail } from './utilities/helperFunctions/modifyEmail';

const App = (props) => {
  const {
    onSetUserData,
    onAuthenticateEnd,
    onLogout,
    onClearPosts,
    onSetShowNav,
    onSetShowDiscoverBar,
    onSetIsGetPostsLoading,
    onSetChat,
    isAuthenticated,
  } = props;

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  toast.configure();

  const UserProfile = React.lazy(() => {
    return import('./components/userProfile/UserProfile');
  });
  const FriendsPage = React.lazy(() => {
    return import('./components/friendsPage/FriendsPage');
  });
  const ChatPage = React.lazy(() => {
    return import('./components/chatPage/ChatPage');
  });
  const Nofound = React.lazy(() => {
    return import('./components/errorPage/nofound/Nofound');
  });
  const NoAccess = React.lazy(() => {
    return import('./components/errorPage/noAccess/NoAccess');
  });

  const clearCurrentPageState = () => {
    onLogout();
    onSetShowNav(false);
    onClearPosts();
    onSetUserData({}, null);
    setLoading(false);
  };

  const verifyUser = async (user) => {
    const unverifiedCurrentUserDataSnapshot = await fire.database().ref(`unverifiedUsers/${user}`).get();

    const unverifiedCurrentUserData = unverifiedCurrentUserDataSnapshot.val();

    const updates = {};
    updates[`unverifiedUsers/${user}`] = null;
    updates[`users/${user}`] = unverifiedCurrentUserData;

    await fire.database().ref().update(updates);

    return unverifiedCurrentUserData;
  };

  React.useEffect(() => {
    fire.auth().onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        clearCurrentPageState();
        return;
      }

      if (!fire.auth().currentUser.emailVerified) {
        successToast('Verification email has been sent to your address. Verify to sing in.');
        clearCurrentPageState();
        return;
      }

      const fireUser = fire.auth().currentUser;
      const fireUserModifiedEmail = modifyEmail(fireUser.email);

      try {
        const usersDataSnapshot = await fire.database().ref(`users`).get();
        let usersData = { ...usersDataSnapshot.val() };

        const isUserVerified = usersData[fireUserModifiedEmail];

        if (!isUserVerified) {
          const verifiedUserData = await verifyUser(fireUserModifiedEmail);
          usersData = { ...usersData, [fireUserModifiedEmail]: verifiedUserData };
        }

        setLoading(false);
        onAuthenticateEnd(fireUser);
        onSetChat(usersData[fireUserModifiedEmail].chat);
        onSetUserData(usersData, fireUserModifiedEmail);
      } catch (error) {
        clearCurrentPageState();
        failToast(error.message);
      }
    });
  }, []);

  React.useEffect(() => {
    onSetShowNav(false);
    onSetShowDiscoverBar(false);
    onSetIsGetPostsLoading(true);
  }, [location.pathname, location.search]);

  const routes = isAuthenticated ? (
    <Switch>
      <Route path='/' exact render={() => <Home />} />
      <Route
        path={`/users`}
        exact
        render={() => {
          return <UserProfile />;
        }}
      />
      <Route path='/chat' exact render={() => <ChatPage />} />
      <Route path='/friends' exact render={() => <FriendsPage />} />
      <Route path='*' render={() => <Nofound />} />
    </Switch>
  ) : (
    <Switch>
      <Route path='/' exact render={() => <AuthenticationMainPage />} />
      <Route path='/chat' render={() => <NoAccess />} />
      <Route path='/users' render={() => <NoAccess />} />
      <Route path='/friends' render={() => <NoAccess />} />
      <Route path='*' render={() => <Nofound />} />
    </Switch>
  );

  return (
    <div>
      <Suspense fallback={<div></div>}>{loading ? <Spinner /> : routes}</Suspense>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetUserData: (data, modifiedEmail) => dispatch(actions.setUserData(data, modifiedEmail)),
    onAuthenticateEnd: (fireUser) => dispatch(actions.authenticationEnd(fireUser)),
    onLogout: () => dispatch(actions.logout()),
    onClearPosts: () => dispatch(actions.clearPosts()),
    onSetShowNav: (show) => dispatch(actions.setShowNav(show)),
    onSetShowDiscoverBar: (show) => dispatch(actions.setShowDiscoverBar(show)),
    onSetIsGetPostsLoading: (loading) => dispatch(actions.setIsGetPostsLoading(loading)),
    onSetChat: (chat) => dispatch(actions.setChat(chat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
