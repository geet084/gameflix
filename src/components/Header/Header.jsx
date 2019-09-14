import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

export const Header = ({ handleSearch, handleReset, name, num, min_players, max_players, max_playtime, min_rating }) => {
  const players = ['0', '1', '2', '3', '4', '5', '6+']
  const playTime = ['0', '15 max', '30 max', '45 max', '60 max', '90 max', '120 max', 'Over 120']
  const stars = ['0 stars & up', '1 star & up', '2 stars & up', '3 stars & up', '4 stars & up']

  return (
    <header>
      <h1 className="title">GAMEFLIX</h1>
      <div className="options">
        <span className="block">
          <p> results:  <span className="num">{num}</span></p>
          <button onClick={handleReset}>Reset</button>
          <input id="name" type="text" value={name} onChange={handleSearch} placeholder="Search" />
        </span>
        <div className="drop-downs">
          <span className="block">
            <Dropdown id="min_players" name="Min Players:" value={min_players} range={players} handleSearch={handleSearch} />
            <Dropdown id="max_playtime" name="Playtime (mins):" value={max_playtime} range={playTime} handleSearch={handleSearch} />
          </span>
          <span className="block">
            <Dropdown id="max_players" name="Max Players:" value={max_players} range={players} handleSearch={handleSearch} />
            <Dropdown id="min_rating" name="Avg. User Rating:" value={min_rating} range={stars} handleSearch={handleSearch} />
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header;