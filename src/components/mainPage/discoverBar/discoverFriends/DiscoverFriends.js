import React from "react";

import classes from "./discoverFriends.module.scss";
import Friend from "./friend/Friend";
import SectionTitle from "./../sectionTitile/SectionTitle";

const DiscoverFriends = (props) => {
  return (
    <div className={classes.discoverFriendsComponent}>
      <SectionTitle title={props.type === "home" ? "Discover others" : "Followed"} />
      <Friend name="Jan Kowalski" modifiedEmail="jankowalskiwppl" profileImage={null} type="unfollowed" />
      <Friend name="Jan Kowalski" modifiedEmail="jankowalskiwppl" profileImage={null} type="unfollowed" />
      <Friend name="Stanisław Macierewicz" modifiedEmail="jankowalskiwppl" profileImage={null} type="followed" />
    </div>
  );
};

export default DiscoverFriends;
