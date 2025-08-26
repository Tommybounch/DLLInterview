import React from 'react';
import { Button, Select, InputLabel, FormControl } from '@mui/material';
import './App.css';

function App() {
  const handleSort = (event: any) => {
    console.log('Sort Option Selected');
  };

  const handleSearch = (event: any) => {
    console.log('Search Button Clicked');
  };

  return (
    <div className="App">
      <h1>Get Users Web App</h1>
      <div className="parentContainer">
        <div className="searchPanel">
          <Button
            variant="contained"
            color="primary"
            className="searchButton"
            onClick={handleSearch}
          >
            Search
          </Button>
          <FormControl>
            <InputLabel id="sortFilterLabel">Sort By</InputLabel>
            <Select
              labelId="sortFilterLabel"
              value=""
              id="sortFilter"
              className="searchFilter"
              onChange={handleSort}
            ></Select>
          </FormControl>
        </div>
        <div className="resultsPanel">
          <h2>User List</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
