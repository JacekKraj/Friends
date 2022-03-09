import React from 'react';

import WholePageWrapper from './../wrappers/wholePageWrapper/WholePageWrapper';
import SideNav from './../pagesComponents/sideNav/SideNav';
import FriendsPageMainContent from './friendsPageMainContent/FriendsPageMainContent';

const FriendsPage = () => {
  return (
    <WholePageWrapper>
      <SideNav />
      <FriendsPageMainContent />
    </WholePageWrapper>
  );
};

export default FriendsPage;
