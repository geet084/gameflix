import React from 'react';

export const GameInfo = (props) => {
  const { toggle, name, images, min_players, max_players, min_playtime, max_playtime, min_age, description, price, msrp, discount, primary_publisher, average_user_rating, historical_low_price } = props;

  const maxDescLength = 250;
  let shortDesc = '';
  description.split(' ').forEach(word => {
    if (`${shortDesc} ${word}`.length <= maxDescLength) shortDesc += ` ${word}`;
  })

  return (
    <section className="info">
      <span className="back" onClick={() => toggle(name)}>X</span>
      <h2 className="title">{name}</h2>
      <img src={images.small} alt={name}/>
      <p>Players: {min_players} - {max_players}</p>
      <p>Playtime: {min_playtime} - {max_playtime} minutes</p>
      <p>Average User Rating: {average_user_rating.toFixed(2)}</p>
      <p>Minimum age: {min_age}</p>
      <p>Price: ${price} - {(discount*100).toFixed(0)}% off</p>
      <p>MSRP: ${msrp}</p>
      <p>Historical Low Price: ${historical_low_price}</p>
      <p>Publisher: {primary_publisher}</p>
      <div>
        <p>Mechanics: </p>
      </div>
      <div>
        <p>Categories: </p>
      </div>
      <p className="desc ellipsis">{shortDesc} ...</p>
    </section>
  )
}

export default GameInfo;