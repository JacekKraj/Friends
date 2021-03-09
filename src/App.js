import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import * as actions from "./actions/index";
import fire from "./firebaseConfig";
import AuthenticationMainPage from "./components/authentication/authenticationMainPage/AuthenticationMainPage";
import { failToast, successToast } from "./utilities/toasts/toasts";
import Home from "./components/mainPage/home/Home";
import Spinner from "./components/UI/spinner/Spinner";
import { modifyEmail } from "./utilities/helperFunctions/modifyEmail";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [extraPaths, setExtraPaths] = useState([]);

  toast.configure();

  React.useEffect(() => {
    fire.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        if (fire.auth().currentUser.emailVerified) {
          const fireUser = fire.auth().currentUser;
          const modifiedEmail = modifyEmail(fireUser.email);
          fire
            .database()
            .ref(`users/${modifiedEmail}`)
            .get()
            .then((snapshot) => {
              setLoading(false);
              props.onAuthenticateEnd(fireUser);
              props.onSetDefaultUserData({ ...snapshot.val() }, modifiedEmail);
              setExtraPaths((currState) => [...currState, snapshot.val().name]);
            })
            .catch(() => {
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
        setLoading(false);
      }
    });
  }, []);

  let routes = props.isAuthenticated ? (
    <Switch>
      <Route path="/" exact render={() => <Home />} />
      {extraPaths.map((el) => {
        return (
          <Route
            path={`/${el.replace(" ", "%20")}`}
            exact
            key={el}
            render={() => {
              <AuthenticationMainPage />;
            }}
          />
        );
      })}
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact render={() => <AuthenticationMainPage />} />
    </Switch>
  );

  routes = loading ? <Spinner /> : routes;

  return <div>{routes}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetDefaultUserData: (data, modifiedEmail) => dispatch(actions.setDefaultUserData(data, modifiedEmail)),
    onAuthenticateEnd: (fireUser) => dispatch(actions.authenticationEnd(fireUser)),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
