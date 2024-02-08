import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Home from './components/main/Home';
import DashBoard from './components/main/DashBoard';
import Navbar from './components/main/Navbar';



function App() {
  return (
    <Router>
       <Routes>
 
       
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
         
        </Routes>
     
    </Router>
  );
}

export default App;
