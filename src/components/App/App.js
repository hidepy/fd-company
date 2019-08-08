import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

<Link to="/JH0101">JH0101</Link>

<Link to="/JH0102">JH0102</Link>



      </header>
    </div>
  );
}

export default App;
