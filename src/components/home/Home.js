import React from 'react';
import { useSelector } from 'react-redux';

import MainContent from './mainContent/MainContent';
import DiscoverBar from './../pagesComponents/discoverBar/DiscoverBar';
import SideNav from './../pagesComponents/sideNav/SideNav';
import DiscoverFriends from './../pagesComponents/discoverBar/discoverFriends/DiscoverFriends';
import DiscoverChat from './../pagesComponents/discoverBar/discoverChat/DiscoverChat';
import WholePageWrapper from './../wrappers/wholePageWrapper/WholePageWrapper';

const Home = () => {
  const { unfollowedUsers } = useSelector((state) => state.userData);

  return (
    <WholePageWrapper>
      <SideNav />
      <MainContent />
      <DiscoverBar>
        <DiscoverFriends location='home' users={unfollowedUsers.slice(0, 3)} />
        <DiscoverChat />
      </DiscoverBar>
    </WholePageWrapper>
  );
};

export default Home;
