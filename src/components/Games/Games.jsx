import React from 'react';
import Game from '../Game/Game';

export const Games = ({ games }) => {
  const gameList = games.map(game => <Game key={game.id} {...game} />)
  const blankGames = new Array(4).fill('').map((none, i) => <span key={i} className="empty"></span>)
  
  return (
    <article>
      {gameList}
      {blankGames}
    </article>
  )
}

export default Games;