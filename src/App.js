import './App.css';
import Tavara from './Tavara';
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Tavaralista from './Tavaralista';



function App() {

  return (   
      <div className="App">
        
        <NavLink to='/tavarat'>Kaikki tavarat</NavLink><br></br>
        <NavLink to='/muokkaa'>Muokkaa tavaroita</NavLink>
     
      <Outlet />
    </div>    
  );
}

export default App;