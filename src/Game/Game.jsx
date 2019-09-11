import React from 'react';

export const Game = ({ game }) => {
  return game
    ? <div className="game">{game}</div>
    : <div className="empty"></div>
}

export default Game;