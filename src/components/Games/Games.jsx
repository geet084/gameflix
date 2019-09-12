import React, { useState } from 'react';
import GameTile from '../GameTile/GameTile';
import GameInfo from '../GameInfo/GameInfo';

export const Games = ({ games }) => {
  const [selectedGame, setselectedGame] = useState('')

  const toggle = (gameName) => {
    if (selectedGame === '') setselectedGame(gameName)
    else setselectedGame('')
  }

  const gameTiles = games.map(game => <GameTile toggle={toggle} key={game.id} {...game} />)
  const blankTiles = new Array(4).fill('').map((none, i) => <span key={i} className="empty"></span>)
  const game = games.find(game => game.name === selectedGame)


  return (
    <article>
      {selectedGame === '' ? gameTiles : <GameInfo toggle={toggle} {...game} />}
      {blankTiles}
    </article>
  )
}

export default Games;