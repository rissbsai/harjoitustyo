import './App.css';
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Tavaralista from './Tavaralistamuokkaus';



function App() {  
  return (   
      <div className="App">  
      <nav>    
        <NavLink to='/tavarat'>Kaikki tavarat</NavLink><br></br>
        <NavLink to='/muokkaa'>Poista tavaroita</NavLink>   
        </nav> 
      <Outlet />
    </div>    
  );
}

export default App;