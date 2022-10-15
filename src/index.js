import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './page/login';
import SignUp from './page/register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// Import the functions you need from the SDKs you need


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>This is Landing Page</div>}></Route>
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route path="/*" element={<div>Not Found 404</div>}></Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);


