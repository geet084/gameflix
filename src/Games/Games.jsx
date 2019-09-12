import React from 'react';
import Game from '../Game/Game';

export const Games = ({ games }) => {
  const gameList = games.map(game => <Game key={game.id} {...game} />)
  const blankGames = new Array(2).fill('').map((none, i) => <Game key={i} />)

  return (
    <article>
      {games[0] && gameList}
      {blankGames}
    </article>
  )
}

export default Games;