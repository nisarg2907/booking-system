import React from 'react';

import Navbar from './Navbar';
import DashBoard from './DashBoard';
import RoomsList from './RoomsList';

const Home = () => {
  return (
    <>
      <Navbar user="John"  />
      <RoomsList/>
      <DashBoard/>
    </>
     
    
  );
};


export default Home;
