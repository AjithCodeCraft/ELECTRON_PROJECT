import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Admin from './pages/admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}> </Route>
        <Route path='/admin' element ={<Admin />}></Route>

      
       
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
