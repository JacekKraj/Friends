import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";

import classes from "./discoverUsers.module.scss";
import User from "./user/User";

const DiscoverUsers = (props) => {
  const [noUsersInfo, setNoUsersInfo] = React.useState("");
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const message = props.toFollow
      ? "You follow all available users right now. Try discovering others later."
      : "You don't follow any other user yet.";

    const users = [...props.users].map((el) => {
      return <User key={el.modifiedEmail} name={el.name} modifiedEmail={el.modifiedEmail} profileImage={el.profileImage} toFollow={props.toFollow} />;
    });
    setUsers(users);
    setNoUsersInfo(message);
  }, [props.users.length]);

  const Arrow = ({ text }) => {
    return <div className={classes.arrow}>{text}</div>;
  };

  const ArrowLeft = Arrow({ text: "<" });
  const ArrowRight = Arrow({ text: ">" });

  return (
    <div className={classes.discoverUsersComponent}>
      <p className={classes.header}>{props.header}</p>
      <div className={classes.users}>
        {props.users.length ? (
          <ScrollMenu
            data={users}
            hideSingleArrow={true}
            arrowDisabledClass={classes.arrowsHidden}
            hideArrows={true}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            wheel={false}
            alignCenter={false}
          />
        ) : (
          <p className={classes.info} data-test="no-users-info">
            {noUsersInfo}
          </p>
        )}
      </div>
    </div>
  );
};

export default DiscoverUsers;
