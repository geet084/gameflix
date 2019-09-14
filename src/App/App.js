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
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerms]);

  const fetchData = async () => {
    const url = process.env.REACT_APP_SEARCH_URL;
    const client = process.env.REACT_APP_CLIENT;
    let params = getParams();

    try {
      const response = await fetch(url + params + client);
      if (!response.ok) throw Error(response.statusText);
      const result = await response.json();
      setGames(result.games);
    } catch ({ message }) {
      setErrors(`Oops! It looks like there was an issue: ${message}`);
    }
  }

  const getParams = () => {
    const { name, min_players, max_players, max_playtime } = searchTerms;
    let params = ''

    if (name !== '') params += `name=${name}&`;

    if (min_players > 0) params += `gt_min_players=${min_players - 1}&`;

    if (max_players === 6) params += `gt_max_players=${max_players}&`;
    else if (max_players > 0 && max_players < 6) params += `max_players=${max_players}&`;

    if (max_playtime > 120) params += `min_playtime=120&`;
    else if (max_playtime > 0 && max_playtime <= 120) params += `max_playtime=${max_playtime}&`

    return params;
  }

  const handleSearch = ({ target }) => {
    const nameIsNotBlank = !(target.value === ' ' && searchTerms.name.length < 1)
    const nameSearch = target.id === 'name' && nameIsNotBlank;
    const value = nameSearch ? target.value : parseInt(target.value);

    setSearchTerms({ ...searchTerms, [target.id]: value });
  }

  const handleReset = () => setSearchTerms({ ...defaultSearch });

  const listedGames = games.filter(game => {
    return game && (game.average_user_rating >= searchTerms.min_rating || !searchTerms.min_rating)
  });

  return (
    <main className="App">
      {hasError !== "" && <h3 className="err-msg">{hasError}</h3>}
      <Header
        {...searchTerms}
        num={listedGames.length}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      {games[0] ? <Games games={listedGames} /> : <Loading />}
    </main>
  );
}

export default App;