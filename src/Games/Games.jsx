import React from 'react';
import Game from '../Game/Game';
const gamesList = new Array(25).fill('game');
//depends on how many boxes you have on screen 7 for full screen
const empty = new Array(7).fill('');

const games = gamesList.map((game, i) => {
  return <Game key={i} game={game + ' ' + i} />
})
const blankGames = empty.map(i => <Game key={i} />)

export const Games = () => {
  return (
    <article>
      {games}
      {blankGames}
    </article>
  )
}

export default Games;