import React from 'react';
import Navbar from './Navbar';
import RoomsList from './RoomsList';
import { useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';

const Home = () => {
  
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const id = authState.user._id;
  console.log(id);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn, navigate]);

  return (
    <>
      {isLoggedIn ? (
        <div style={{ backgroundColor: '#e1f5fe', minHeight: '100vh' }}>
          <Navbar />
          <RoomsList />
        </div>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <h2>You need to have an account</h2>
          <Link to="/login">Login to Your Account first</Link>
        </div>
      )}
    </>
  );
};

export default Home;
