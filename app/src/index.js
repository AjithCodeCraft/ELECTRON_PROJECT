import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Admin } from './pages/Admin';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Main layout */}
        <Route path="/" element={<Layout />}>
          {/* Admin page as a nested route */}
          <Route path="admin" element={<Admin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
