import React, { useState } from 'react';
import GameTile from '../GameTile/GameTile';
import GameInfo from '../GameInfo/GameInfo';

export const Game = (props) => {
  const [showSingleGame, setShowSingleGame] = useState('')

  const toggle = (gameName) => {
    if (showSingleGame === '') setShowSingleGame(gameName)
    else setShowSingleGame('')
  }

  const tileProps = {
    images: props.images,
    name: props.name,
    min_players: props.min_players,
    max_players: props.max_players,
    min_age: props.min_age,
    min_playtime: props.min_playtime,
    max_playtime: props.max_playtime,
    average_user_rating: props.average_user_rating
  }

  return showSingleGame === ''
    ? <GameTile toggle={toggle} {...tileProps} />
    : <GameInfo toggle={toggle} {...props} /> 
}

export default Game;