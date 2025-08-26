import React from 'react';
import {
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from '@mui/material';
import './App.css';
import { UserEntry } from './components/userEntry';

//For changes made to the type here, also update const sortOptions and userEntry in userEntry.tsx
type userEntry = {
  id: number;
  name: string;
};

function App() {
  const [users, setUsers] = React.useState<userEntry[]>([]);
  const [size, setSize] = React.useState<number>(2);
  const [page, setPage] = React.useState<number>(1);
  const [sortField, setSortField] = React.useState<string>('id');
  const sortOptions = ['id', 'name'] as (keyof userEntry)[];

  const handleSort = (event: any) => {
    console.log('Sort Option Selected');
    setSortField(event.target.value);
  };

  const handleSearch = (event: any) => {
    console.log('Search Button Clicked');
    const searchUrl = `http://localhost:3001/api/users?size=${size}&page=${page}&sortField=${sortField}`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.error('Error fetching users:', error));
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
              value={sortField}
              id="sortFilter"
              className="searchFilter"
              onChange={handleSort}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="resultsPanel">
          <div className="userHeaders">
            {sortOptions.map((option) => (
              <div className="userHeader">{option}</div>
            ))}
          </div>
          <div className="userResults">
            {users?.length > 0 ? (
              users.map((user) => (
                <UserEntry key={user.id} id={user.id} name={user.name} />
              ))
            ) : (
              <div className="emptyMessage">No users found</div>
            )}
          </div>
          <div className="navigationButtons">
            <Button variant="contained" color="primary" className="navButton">
              Previous
            </Button>
            <Button variant="contained" color="primary" className="navButton">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
