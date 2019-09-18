import React, { useState } from 'react';
import GameTile from '../GameTile/GameTile';
import GameInfo from '../GameInfo/GameInfo';

export const Games = ({ games, mechanics, categories }) => {
  const [selectedGame, setselectedGame] = useState('')

  const toggle = (gameName) => {
    if (selectedGame === '') setselectedGame(gameName)
    else setselectedGame('')
  }

  const gameTiles = games.map(game => <GameTile toggle={toggle} key={game.id} {...game} />)
  const blankTiles = new Array(4).fill('').map((none, i) => <span key={i} className="empty"></span>)
  const game = games.find(game => game.name === selectedGame)

  if (game) {
    game.mechanics = game.mechanics.map(mech => mechanics.find(data => data.id === mech.id).name)
    game.categories = game.categories.map(cat => categories.find(data => data.id === cat.id).name)
  }

  return (
    <article className="games">
      {selectedGame === '' ? gameTiles : <GameInfo toggle={toggle} {...game} />}
      {blankTiles}
    </article>
  )
}

export default Games;