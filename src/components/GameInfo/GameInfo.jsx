import React from 'react';

export const GameInfo = (props) => {
  const { toggle, name, images, min_players, max_players, min_playtime, max_playtime, min_age, description } = props;

  return (
    <section className="info">
      <span className="back" onClick={() => toggle(name)}>X</span>
      <h2 className="title">{name}</h2>
      <img src={images.small} alt={name}/>
      <p>Players: {min_players} - {max_players}</p>
      <p>Playtime: {min_playtime} - {max_playtime} minutes</p>
      <p>Minimum age: {min_age}</p>
      <p>{description}</p>
    </section>
  )
}

export default GameInfo;