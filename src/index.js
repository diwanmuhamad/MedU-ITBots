import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './page/login';
import SignUp from './page/register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);


