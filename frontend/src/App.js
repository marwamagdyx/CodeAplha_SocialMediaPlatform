import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import OtherUserProfile from './components/OtherUsers';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/users/:id" element={<OtherUserProfile />} /> 
      </Routes>
    </div>
  );
};

export default App;
