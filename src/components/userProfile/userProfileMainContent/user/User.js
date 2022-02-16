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
import * as actions from './../../../../actions/index';
import { breakpoints } from './../../../../utilities/breakpoints/breakpoints';
import { MODAL_TYPES } from '../../../../modalMenager/ModalMenager';

const { mobileVertical, tabletVertical, mobileHorizontal, tabletHorizontal, laptopSm } = breakpoints;

const useStyles = makeStyles(() => ({
  icon: {
    color: '#ffa500',
    width: 23,
    height: 23,
    [mobileVertical]: {
      width: 26,
      height: 26,
    },
    [tabletVertical]: {
      width: 29,
      height: 29,
    },
    [mobileHorizontal]: {
      width: 25,
      height: 25,
    },
    [tabletHorizontal]: {
      width: 30,
      height: 30,
    },
    [laptopSm]: {
      width: 28,
      height: 28,
    },
  },
  chatIcon: {
    color: 'white',
    width: 26,
    height: 26,
    [tabletVertical]: {
      width: 38,
      height: 38,
    },
  },
}));

const User = (props) => {
  const { user, onFollowUser, onUnfollowUser, onShowModal } = props;
  const { type, modifiedEmail, profileImage, personalInfo, name, birthdayDate } = user;

  const style = useStyles();

  const displayButton = React.useMemo(() => {
    let buttonProps = {};
    switch (type) {
      case 'current':
        buttonProps = {
          transparent: true,
          text: 'Update profile',
          handleClick: onShowModal.bind(null, MODAL_TYPES.UPDATE_PROFILE, {}),
        };
        break;
      case 'followed':
        buttonProps = { transparent: false, text: 'Unfollow', handleClick: onUnfollowUser.bind(null, modifiedEmail) };
        break;
      default:
        buttonProps = { transparent: true, text: 'Follow', handleClick: onFollowUser.bind(null, modifiedEmail) };
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
    onFollowUser: (userToFollow) => dispatch(actions.followUser(userToFollow)),
    onUnfollowUser: (userToUnfollow) => dispatch(actions.unfollowUser(userToUnfollow)),
    onShowModal: (type, props) => dispatch(actions.showModal(type, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
