import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ChatIcon from '@material-ui/icons/Chat';
import WorkIcon from '@material-ui/icons/Work';
import WcIcon from '@material-ui/icons/Wc';
import HouseIcon from '@material-ui/icons/House';
import CakeIcon from '@material-ui/icons/Cake';
import classes from './user.module.scss';
import Button from '../../../UI/button/Button';
import UserInfo from './userInfo/UserInfo';
import Spinner from './../../../UI/spinner/Spinner';
import UpdateProfileModal from './updateProfileModal/UpadateProfileModal';
import * as actions from './../../../../actions/index';
import { theme } from './../../../../utilities/breakpoints/breakpoints';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    [theme.breakpoints.up('0')]: {
      width: 23,
      height: 23,
    },
    [theme.breakpoints.up('400')]: {
      width: 26,
      height: 26,
    },

    [theme.breakpoints.up('550')]: {
      width: 29,
      height: 29,
    },

    [`${theme.breakpoints.up('550')} and (orientation:landscape)`]: {
      width: 25,
      height: 25,
    },

    [`${theme.breakpoints.up('800')} and (orientation:landscape)`]: {
      width: 30,
      height: 30,
    },

    [`${theme.breakpoints.up('1000')} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
    },
  },
  chatIcon: {
    color: 'white',
    [theme.breakpoints.up('0')]: {
      width: 26,
      height: 26,
    },
    [`${theme.breakpoints.up('768')} and (orientation:portrait)`]: {
      width: 38,
      height: 38,
    },
  },
}));

const User = (props) => {
  const { user, followedUsersEmails, currentUserEmail, onFollowUser, onUnfollowUser } = props;
  const { type, modifiedEmail, profileImage, personalInfo, name, birthdayDate } = user;

  const [isUpdateModalShown, setIsUpdateModalShown] = React.useState(false);
  const style = useStyles();

  const displayButton = React.useMemo(() => {
    let buttonProps = {};
    let handleClick;

    switch (type) {
      case 'current':
        handleClick = () => {
          setIsUpdateModalShown(true);
        };
        buttonProps = { transparent: true, text: 'Update profile', handleClick };
        break;
      case 'followed':
        handleClick = () => {
          onUnfollowUser(modifiedEmail, currentUserEmail, followedUsersEmails);
        };
        buttonProps = { transparent: false, text: 'Unfollow', handleClick };
        break;
      default:
        handleClick = () => {
          onFollowUser(modifiedEmail, currentUserEmail, followedUsersEmails);
        };
        buttonProps = { transparent: true, text: 'Follow', handleClick };
        break;
    }

    return (
      <Button className={classes.button} testData='profile-button' onClick={buttonProps.handleClick} isTransparent={buttonProps.transparent}>
        {buttonProps.text}
      </Button>
    );
  }, [type]);

  const isUserDataDownloaded = !!Object.keys(user).length;

  return (
    <div className={classes.userInfoComponent}>
      {isUserDataDownloaded ? (
        <React.Fragment>
          {isUpdateModalShown && (
            <UpdateProfileModal hideModal={() => setIsUpdateModalShown(false)} user={{ modifiedEmail, profileImage, personalInfo }} />
          )}
          <div className={classes.infoTop}>
            <img src={profileImage} alt='user profile image' className={classes.image} />
            <div className={classes.buttonsContainer}>
              {displayButton}
              {type === 'followed' && (
                <NavLink className={classes.chatLink} to={`/chat?to=${modifiedEmail}`}>
                  <ChatIcon className={style.chatIcon} />
                </NavLink>
              )}
            </div>
          </div>
          <div className={classes.infoBottom}>
            <p className={classes.name}>{name}</p>
            {personalInfo?.profileDescription && (
              <p data-test='profile-description' className={classes.description}>
                {personalInfo.profileDescription}
              </p>
            )}
            <div className={classes.moreInfoContainer}>
              <UserInfo icon={<CakeIcon className={style.icon} />} text={`${birthdayDate.day} ${birthdayDate.month} ${birthdayDate.year}`} />
              {personalInfo?.gender && <UserInfo icon={<WcIcon className={style.icon} />} text={personalInfo.gender} />}
              {personalInfo?.home && <UserInfo icon={<HouseIcon className={style.icon} />} text={personalInfo.home} />}
              {personalInfo?.work && <UserInfo icon={<WorkIcon className={style.icon} />} text={personalInfo.work} />}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followedUsersEmails: state.userData.currentUser.followedUsersEmails,
    currentUserEmail: state.userData.currentUser.modifiedEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowUser: (userToFollow, currentUser, followedUsersEmails) => dispatch(actions.followUser(userToFollow, currentUser, followedUsersEmails)),
    onUnfollowUser: (userToUnfollow, currentUser, followedUsersEmails) =>
      dispatch(actions.unfollowUser(userToUnfollow, currentUser, followedUsersEmails)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
