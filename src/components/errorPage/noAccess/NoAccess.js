import React from "react";

import errorImg from "./../../../assets/images/accessError.png";
import ErrorPage from "./../ErrorPage";
import classes from "./noAccess.module.scss";

const NoAccess = () => {
  const error = {
    type: "No access. ",
    message: "This URL is not available for unauthenticated users. ",
    advice: "Sign in to get access.",
    image: errorImg,
  };
  return <ErrorPage error={error} className={classes.image} />;
};

export default NoAccess;
