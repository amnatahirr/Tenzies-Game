import React from 'react';
import './App.css';
import Main from './components/Main';

function App() {
  return (
    <div className="main">
      <h1 className='tenzies'>TENZIES</h1>
      <p className='txt'>Roll until all dice are the same.
         Click each dice<br/> to freeze it at its current value
          between rolls.
      </p>
      
    <Main/>
    </div>
  );
}

export default App;