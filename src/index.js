import React from 'react';
import './index.css';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tavaralista from './Tavaralista';
import Tavaralistamuokkaus from './Tavaralistamuokkaus';



ReactDOMClient.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={ <App />}> 
      <Route path="tavarat" element={ <Tavaralista />} />
      <Route path="muokkaa" element={ <Tavaralistamuokkaus />} />
      
      </Route>
   
    </Routes>
    </BrowserRouter>
  
  
);