import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import { AdminPage } from './pages/Admin';
import { HomePage } from './pages/Home';

export const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};
