import React from 'react';
import './index.css';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



ReactDOMClient.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={ <App />}>

    </Route>
   
    </Routes>
    </BrowserRouter>
  
  
);