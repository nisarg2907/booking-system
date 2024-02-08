import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const LoginForm = lazy(() => import('./components/auth/LoginForm'));
const RegisterForm = lazy(() => import('./components/auth/RegisterForm'));
const Home = lazy(() => import('./components/main/Home'));
const DashBoard = lazy(() => import('./components/main/DashBoard'));

function App() {
 
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><RegisterForm /></Suspense>} />
        <Route path="/home" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><DashBoard /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
