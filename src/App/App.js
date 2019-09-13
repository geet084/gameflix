import React, { useState, useEffect } from 'react';
import Games from '../components/Games/Games';
import Header from '../components/Header/Header';
import Loading from '../components/Loading/Loading';

const App = () => {
  const defaultSearch = {
    name: '',
    min_players: 0,
    max_players: 0,
    max_playtime: 0,
    min_rating: 0
  }
  const [hasError, setErrors] = useState('');
  const [searchTerms, setSearchTerms] = useState(defaultSearch);
  const [games, setGames] = useState([]);

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

  const handleSearch = ({ target }) => {
    const nameIsNotBlank = !(target.value === ' ' && searchTerms.name.length < 1)
    const nameSearch = target.id === 'name' && nameIsNotBlank;
    const value = nameSearch ? target.value : parseInt(target.value);

    setSearchTerms({ ...searchTerms, [target.id]: value });
  }

  return (
    <main className="App">
      {hasError !== "" && <h3 className="err-msg">{hasError}</h3>}
      <Header handleSearch={handleSearch} />
      {games[0] ? <Games games={games} /> : <Loading /> }
    </main>
  );
}

export default App;
