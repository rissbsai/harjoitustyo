import './App.css';
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Tavaralista from './Tavaralista';



function App() {  
  return (   
      <div className="App">  
      <nav>    
        <NavLink to='/tavarat'>Kaikki tavarat</NavLink><br></br>
        <NavLink to='/muokkaa'>Muokkaa varastoa</NavLink>   
        </nav> 
      <Outlet />
    </div>    
  );
}

export default App;