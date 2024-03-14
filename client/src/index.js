import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import bootstrap from 'bootstrap' //do not remove -- will disable some frontend functionalities like dropdowns

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={ <App /> }></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);