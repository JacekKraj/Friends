import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';

import { breakpoints } from './../../../../../utilities/breakpoints/breakpoints';
import classes from './postHeader.module.scss';
import PostEditionPanel from './postEditionPanel/PostEditionPanel';

const { mobileVertical, tabletVertical, mobileHorizontal, tabletHorizontal, laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    cursor: 'pointer',
    width: 26,
    height: 26,
    [mobileVertical]: {
      width: 33,
      height: 33,
    },

    [tabletVertical]: {
      width: 50,
      height: 50,
    },

    [mobileHorizontal]: {
      width: 31,
      height: 31,
    },

    [tabletHorizontal]: {
      width: 35,
      height: 35,
    },

    [laptopSm]: {
      width: 39,
      height: 39,
    },
  },
}));

const PostHeader = ({ author, currUserModifiedEmail, post }) => {
  const [isEditionPanelShown, setIsEditionPanelShown] = React.useState(false);

  const iconStyle = useStyles();

  const postEditionPanelContainerRef = React.useRef(null);

  const countCreationTime = React.useMemo(() => {
    const date = new Date(post.creationTime);
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const creationTime = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} | ${date.getHours()}:${minutes}`;
    return creationTime;
  }, [post.creationTime]);

  const isCurrentUserPost = currUserModifiedEmail === author.modifiedEmail;

  return (
    <div className={classes.postHeader}>
      <NavLink to={`/users?user=${author.modifiedEmail}`}>
        <div className={classes.author}>
          <img src={author.profileImage} className={classes.profileImage} alt='post author profile image' />
          <div>
            <p className={classes.authorName}>{author.name}</p>
            <p className={classes.postCreationTime}>{countCreationTime}</p>
          </div>
        </div>
      </NavLink>
      {isCurrentUserPost && (
        <div className={classes.postEditionPanelContainer} ref={postEditionPanelContainerRef}>
          <MoreHorizIcon
            className={iconStyle.icon}
            data-test='post-edition-icon'
            onClick={() => {
              setIsEditionPanelShown(!isEditionPanelShown);
            }}
          />
          {isEditionPanelShown && (
            <PostEditionPanel
              setIsEditionPanelShown={setIsEditionPanelShown}
              postEditionPanelContainerRef={postEditionPanelContainerRef}
              post={post}
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currUserModifiedEmail: state.userData.currentUser.modifiedEmail,
  };
};

export default connect(mapStateToProps)(PostHeader);
