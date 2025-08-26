import React from 'react';
import './App.css';

function App() {
  return (
    //Parent Div
    <div className="App">
      <h1>Get Users Web App</h1>
      <div className="parentContainer">
        <div className="searchPanel">
          <h1>Button</h1>
          <h2>dropDown for sort/filter</h2>
        </div>
        <div className="resultsPanel">
          <h1>User List</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
