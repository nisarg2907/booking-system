import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const LoginForm = lazy(() => import('./components/auth/LoginForm'));
const RegisterForm = lazy(() => import('./components/auth/RegisterForm'));
const Home = lazy(() => import('./components/main/Home'));
const DashBoard = lazy(() => import('./components/main/DashBoard'));
const NotFound = () => <div>Page Not Found</div>; // Create a NotFound component

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" />} // Redirect from / to /home
        />
        <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><RegisterForm /></Suspense>} />
        <Route path="/home" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
        <Route path="/dashboard" element={<Suspense fallback={<div>Loading...</div>}><DashBoard /></Suspense>} />
        <Route path="*" element={<NotFound />} /> {/* Catch all other routes */}
      </Routes>
    </Router>
  );
}

export default App;
