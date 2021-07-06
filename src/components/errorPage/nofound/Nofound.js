import React from "react";

import ErrorPage from "./../ErrorPage";
import errorImg from "./../../../assets/images/404error.png";

const Nofound = () => {
  const error = {
    type: "404. ",
    message: "The requested URL was not found on the server. ",
    advice: "That's all we know.",
    image: errorImg,
  };
  return <ErrorPage error={error} />;
};

export default Nofound;
