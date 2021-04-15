import React, { useState, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import * as actions from "./actions/index";
import fire from "./firebaseConfig";
import AuthenticationMainPage from "./components/authentication/authenticationMainPage/AuthenticationMainPage";
import { failToast, successToast } from "./utilities/toasts/toasts";
import Home from "./components/home/Home";
import Spinner from "./components/UI/spinner/Spinner";
import { modifyEmail } from "./utilities/helperFunctions/modifyEmail";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  toast.configure();

  const UserProfile = React.lazy(() => {
    return import("./components/userProfile/UserProfile");
  });

  React.useEffect(() => {
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        if (fire.auth().currentUser.emailVerified) {
          const fireUser = fire.auth().currentUser;
          const modifiedEmail = modifyEmail(fireUser.email);
          fire
            .database()
            .ref(`users`)
            .get()
            .then((snapshot) => {
              setLoading(false);
              props.onAuthenticateEnd(fireUser);
              props.onSetUserData({ ...snapshot.val() }, modifiedEmail);
            })
            .catch((error) => {
              setLoading(false);
              props.onLogout();
              failToast("Something went wrong. Try again later.");
            });
        } else {
          successToast("Verification email has been sent to your address. Verify to sing in.");
          props.onLogout();
          setLoading(false);
        }
      } else {
        props.onLogout();
        props.onClearPosts();
        props.onSetUserData({}, null);
        setLoading(false);
      }
    });
  }, []);

  // props.onLogout();

  React.useEffect(() => {
    props.onSetShowNav(false);
    props.onSetShowDiscoverBar(false);
    props.onSetGetPostsLoading(true);
  }, [location.pathname, location.search]);

  let routes = props.isAuthenticated ? (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      <Route
        path={`/users`}
        exact
        render={() => {
          return <UserProfile />;
        }}
      />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact render={() => <AuthenticationMainPage />} />
    </Switch>
  );

  routes = loading ? <Spinner /> : routes;

  return (
    <div>
      <Suspense fallback={<div></div>}>{routes}</Suspense>
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
    onSetGetPostsLoading: (loading) => dispatch(actions.setGetPostsLoading(loading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
