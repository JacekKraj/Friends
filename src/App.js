import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fire } from './firebaseConfig';
import { failToast, successToast } from './utilities/toasts/toasts';
import Spinner from './components/UI/spinner/Spinner';
import { modifyEmail } from './utilities/helperFunctions/modifyEmail';
import ModalMenager from './modalMenager/ModalMenager';
import Routes from './routes/Routes';
import { useActions } from './utilities/hooks/useActions';

const App = () => {
  const [loading, setLoading] = React.useState(true);

  const location = useLocation();

  const { setUserData, authenticationEnd, logout, clearPosts, setShowNav, setShowDiscoverBar, setIsGetPostsLoading, setChat, hideModal } =
    useActions();

  toast.configure();

  const clearCurrentPageState = () => {
    logout();
    setShowNav(false);
    clearPosts();
    setUserData({}, null);
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
        hideModal();
        authenticationEnd(fireUser);
        setChat(usersData[fireUserModifiedEmail].chat);
        setUserData(usersData, fireUserModifiedEmail);
      } catch (error) {
        clearCurrentPageState();
        failToast(error.message);
      }
    });
  }, []);

  React.useEffect(() => {
    setShowNav(false);
    setShowDiscoverBar(false);
    setIsGetPostsLoading(true);
  }, [location.pathname, location.search]);

  return (
    <React.Fragment>
      <Suspense fallback={<div></div>}>{loading ? <Spinner /> : <Routes />}</Suspense>
      <ModalMenager />
    </React.Fragment>
  );
};

export default App;
