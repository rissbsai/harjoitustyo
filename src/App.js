import './App.css';
import Tavara from './Tavara';
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';



function App() {

  return (   
      <div className="App">
      <Tavara />
      <Outlet />
    </div>    
  );
}

export default App;