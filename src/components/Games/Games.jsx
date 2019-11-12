import React, { useState } from 'react';
import GameTile from '../GameTile/GameTile';
import GameInfo from '../GameInfo/GameInfo';

export const Games = ({ games, mechanics, categories, faves, showFaves, handleFaves }) => {
  const [selectedGame, setselectedGame] = useState('')

  const toggle = (gameName) => {
    if (selectedGame === '') setselectedGame(gameName)
    else setselectedGame('')
  }
  
  const gamesList = games.map(game => {
    game.fave = faves.find(fave => fave.id === game.id)
    return game
  })

  let gameTiles = gamesList.map(game => <GameTile toggle={toggle} key={game.id} {...game} handleFaves={handleFaves} />)
  const blankTiles = new Array(4).fill('').map((none, i) => <span key={i} className="empty"></span>)
  const game = gamesList.find(game => game.name === selectedGame)
  
  if (showFaves && gameTiles.length < 1) gameTiles = <h3>No Favorites found</h3>
  else if (!showFaves && gameTiles.length < 1) gameTiles = <h3>No Games Found</h3>
  
  if (game) {
    game.mechs = game.mechanics.map(mech => mechanics.find(data => data.id === mech.id).name)
    game.cats = game.categories.map(cat => categories.find(data => data.id === cat.id).name)
  }
  
  return (
    <article className="games">
      {selectedGame === '' ? gameTiles : <GameInfo toggle={toggle} {...game} handleFaves={handleFaves}/>}
      {blankTiles}
    </article>
  )
}

export default Games;