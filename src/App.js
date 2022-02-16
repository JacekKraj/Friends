import React, { useState, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import * as actions from './actions/index';
import fire from './firebaseConfig';
import { failToast, successToast } from './utilities/toasts/toasts';
import Spinner from './components/UI/spinner/Spinner';
import { modifyEmail } from './utilities/helperFunctions/modifyEmail';
import ModalMenager from './modalMenager/ModalMenager';
import Routes from './routes/Routes';

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
    onHideModal,
  } = props;

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  toast.configure();

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
        onHideModal();
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

  return (
    <React.Fragment>
      <Suspense fallback={<div></div>}>{loading ? <Spinner /> : <Routes />}</Suspense>
      <ModalMenager />
    </React.Fragment>
  );
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
    onHideModal: () => dispatch(actions.hideModal()),
  };
};

export default connect(null, mapDispatchToProps)(App);
