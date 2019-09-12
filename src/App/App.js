import React, { useState, useEffect } from 'react';
import Games from '../Games/Games';
import Header from '../Header/Header';

const App = () => {
  const [hasError, setErrors] = useState('')
  const [games, setGames] = useState([])

  useEffect(() => {
    const url = process.env.REACT_APP_INITIAL_FETCH_URL;

    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw Error(response.statusText);
        const result = await response.json();
        setGames(result.games);
      } catch ({ message }) {
        setErrors(`Oops! It looks like there was an issue: ${message}`);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="App">
      {hasError !== "" && <h3 className="err-msg">{hasError}</h3>}
      <Header />
      {games[0] ? <Games games={games} /> : <h1>Loading</h1> }
    </main>
  );
}

export default App;
