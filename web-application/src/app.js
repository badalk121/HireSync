import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  Dashboard,
  Applications,
  Search,
  Analytics,
  Profile,
  Login,
  Register,
} from './pages';
import { PrivateRoute } from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/search" element={<Search />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;