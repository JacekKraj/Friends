import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import classes from './discoverUsers.module.scss';
import User from './user/User';

const DiscoverUsers = ({ header, areFollowedUsers, usersObjects }) => {
  const [noUsersInfo, setNoUsersInfo] = React.useState('');
  const [users, setUsers] = React.useState([]);

  const getNoUsersInfoMessage = () => {
    const message = areFollowedUsers
      ? 'You follow all available users right now. Try discovering others later.'
      : "You don't follow any other user yet.";

    return message;
  };

  const createUsersComponents = () => {
    const users = [...usersObjects].map((user) => {
      return <User key={user.modifiedEmail} user={user} isToFollow={!areFollowedUsers} />;
    });

    return users;
  };

  React.useEffect(() => {
    const message = getNoUsersInfoMessage();

    const users = createUsersComponents();

    setUsers(users);
    setNoUsersInfo(message);
  }, [usersObjects.length]);

  const Arrow = ({ text }) => {
    return <div className={classes.arrow}>{text}</div>;
  };

  const ArrowLeft = Arrow({ text: '<' });
  const ArrowRight = Arrow({ text: '>' });

  return (
    <div className={classes.discoverUsersComponent}>
      <p className={classes.header}>{header}</p>
      <div className={classes.users}>
        {users.length ? (
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
          <p className={classes.info} data-test='no-users-info'>
            {noUsersInfo}
          </p>
        )}
      </div>
    </div>
  );
};

export default DiscoverUsers;
