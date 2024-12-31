import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import { Admin } from './pages/admin';
import { User } from './pages/user';
import { Login } from './pages/login';
import { Signup } from './pages/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Define root routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
