import React, { useState, useEffect } from 'react';
import Tavaralista from './Tavaralista';

function Tavara() {


    useEffect(() => {
        console.log("mountattu");
        return function cleanup() {
            console.log("putsattu");
        }
    });

    return (
        <div>
  
  
          <Tavaralista />
  
        </div>
      );

}

export default Tavara;