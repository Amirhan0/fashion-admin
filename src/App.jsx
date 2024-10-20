import React from 'react';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categoryes from './pages/Categoryes';
import Users from './pages/Users';
import AdminLogin from './pages/AdminLogin';

const AppContent = () => {
  const location = useLocation();
  const loginAdminPage = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!loginAdminPage && <Header />}
      {!loginAdminPage && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categoryes" element={<Categoryes />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Box>
    </Box>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
