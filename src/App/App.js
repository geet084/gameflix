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
  const [mechanics, setMechanics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);
  const [faves, setFaves] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchData(process.env.REACT_APP_MECHANICS_URL, setMechanics)
    fetchData(process.env.REACT_APP_CATEGORIES_URL, setCategories)
  }, [])

  useEffect(() => {
    const params = getParams();

    fetchData(process.env.REACT_APP_SEARCH_URL + params, setGames)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerms]);

  const fetchData = async (url, stateToSet) => {
    const client = process.env.REACT_APP_CLIENT;

    try {
      const response = await fetch(url + client);
      if (!response.ok) throw Error(response.statusText);
      const result = await response.json();
      stateToSet(result[Object.keys(result)]);
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

    if (max_playtime > 120) params += `gt_min_playtime=119&`;
    else if (max_playtime > 0 && max_playtime <= 120) params += `lt_max_playtime=${max_playtime}&`

    return params;
  }

  const handleSearch = ({ target }) => {
    const nameIsNotBlank = !(target.value === ' ' && searchTerms.name.length < 1)
    const nameSearch = target.id === 'name' && nameIsNotBlank;
    const value = nameSearch ? target.value : parseInt(target.value);

    setSearchTerms({ ...searchTerms, [target.id]: value });
  }

  const handleReset = () => {
    setSearchTerms({ ...defaultSearch })
    setShowFavorites(false)
  };

  const handleFaves = (gameId) => {
    const game = faves.find(fave => fave.id === gameId)
    let favorites

    if (game) favorites = faves.filter(fave => fave.id !== gameId)
    else favorites = [...faves, { ...games.find(game => game.id === gameId) }]

    setFaves(favorites)
  };

  const showFaves = () => setShowFavorites(!showFavorites);

  const listedGames = games.filter(game => {
    return game && (game.average_user_rating >= searchTerms.min_rating || !searchTerms.min_rating)
  });
  
  const faveGames = faves.filter(game => {
    return (
      game
      && ((game.min_players >= searchTerms.min_players) || !searchTerms.min_players)
      && ((game.max_players <= searchTerms.max_players) || !searchTerms.max_players)
      && ((game.max_playtime <= searchTerms.max_playtime) || !searchTerms.max_playtime)
      && ((game.average_user_rating.toFixed(1) >= searchTerms.min_rating) || !searchTerms.min_rating)
    )
  });

  return (
    <main className="App">
      {hasError !== "" && <h3 className="err-msg">{hasError}</h3>}
      <Header
        {...searchTerms}
        num={showFavorites ? faves.length : listedGames.length}
        faves={faves.length}
        showFaves={showFaves}
        handleSearch={handleSearch}
        handleReset={handleReset}
      />
      {
        games[0]
          ? <Games
            games={showFavorites ? faveGames : listedGames}
            faves={faves}
            showFaves={showFavorites}
            mechanics={mechanics}
            categories={categories}
            handleFaves={handleFaves}
          />
          : <Loading />
      }
    </main>
  );
}

export default App;