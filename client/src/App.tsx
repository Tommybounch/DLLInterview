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
  /*** Variables ***/
  const [users, setUsers] = React.useState<userEntry[]>([]);
  const [totalResults, setTotalResults] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(2);
  const [page, setPage] = React.useState<number>(1);
  const [next, setNext] = React.useState<string | ''>('');
  const [previous, setPrevious] = React.useState<string | ''>('');
  const [sortField, setSortField] = React.useState<string>('id');
  const sortOptions = ['id', 'name'] as (keyof userEntry)[];

  /*** Functions ***/
  const handleSort = (event: any) => {
    console.log('Sort Option Selected');
    setSortField(event.target.value);
  };

  const handleSearch = (
    uri: string = `http://localhost:3001/api/users?size=${size}&page=${page}&sortField=${sortField}`
  ) => {
    console.log('Search Button Clicked');
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);

        data.paging.next ? setNext(data.paging.next) : setNext('');
        data.paging.previous
          ? setPrevious(data.paging.previous)
          : setPrevious('');

        setTotalResults(data.paging.totalResults);
      })
      .catch((error) => console.error('Error fetching users:', error));
  };

  /*** Render Element ***/
  return (
    <div className="App">
      <h1>getUsers API</h1>
      <div className="parentContainer">
        {/* Search Panel */}
        <div className="searchPanel">
          <Button
            variant="contained"
            color="primary"
            className="searchButton"
            onClick={() => handleSearch()}
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

        {/* Results Panel */}
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

          {/* Pagination Info */}
          <div className="paginationInfo">
            <div>Total Results: {totalResults}</div>
            <div>Page: {page}</div>
            <div>Results per page: {size}</div>
          </div>

          {/* Pagination Button */}
          <div className="navigationButtons">
            {previous && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSearch(previous);
                  setPage(page - 1);
                }}
              >
                Previous
              </Button>
            )}
            {next && (
              <Button
                variant="contained"
                color="primary"
                className="nextButton"
                onClick={() => {
                  handleSearch(next);
                  setPage(page + 1);
                }}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
