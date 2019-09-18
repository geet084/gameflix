import React, { useState } from 'react';

export const GameInfo = (props) => {
  const { toggle, name, images, min_players, max_players, min_playtime, max_playtime, min_age, description, price, msrp, discount, primary_publisher, average_user_rating, historical_low_price } = props;

  const [showMore, setShowMore] = useState(false);

  const maxDescLength = 250;
  let shortDesc = '';
  description && description.split(' ').forEach(word => {
    if (`${shortDesc} ${word}`.length <= maxDescLength) shortDesc += ` ${word}`;
  })

  const disc = discount && (discount * 100).toFixed(0) > 0
    ? <span className="less">{Math.abs((discount * 100).toFixed(0))}% off</span>
    : <span className="more">{Math.abs((discount * 100).toFixed(0))}% more</span>

  const lowComp = (((price / historical_low_price) - 1) * 100).toFixed(0) < 0.01
    ? <span className="less">{Math.abs((((price / historical_low_price) - 1) * 100).toFixed(0))}% off</span>
    : <span className="more">{Math.abs((((price / historical_low_price) - 1) * 100).toFixed(0))}% more</span>

  return (
    <section className="info">
      <div className="top">
        <span className="icon" onClick={() => toggle(name)}>
          <i class="far fa-arrow-alt-circle-left"></i>
        </span>
        <h2 className="title">{name}</h2>
        <span className="icon" >
          <i class="far fa-heart"></i>
        </span>
      </div>
      <img src={images.small} alt={name} />
      {
        showMore
          ? <p className="desc">{description}</p>
          : <p className="desc ellipsis">{shortDesc} ...</p>
      }
      <span className="show" onClick={() => setShowMore(!showMore)}>
        {`Show ${showMore ? 'Less' : 'More'}`}
      </span>
      {min_players && max_players && <p>Players: {min_players} - {max_players}</p>}
      {min_playtime && max_playtime && <p>Playtime: {min_playtime} - {max_playtime} minutes</p>}
      {average_user_rating && <p>Average User Rating: {average_user_rating.toFixed(2)}</p>}
      {min_age && <p>Minimum age: {min_age}</p>}
      {price && <p>Price: ${price}</p>}
      {msrp && <p>MSRP: ${msrp} &nbsp;&nbsp;&nbsp; {disc}</p>}
      {historical_low_price && <p>Historical Low Price: ${historical_low_price} &nbsp;&nbsp;&nbsp; {lowComp}</p>}
      {primary_publisher && <p>Publisher: {primary_publisher}</p>}
      <div className="mech-cats">
        <div>
          <h5>Mechanics: </h5>
        </div>
        <div>
          <h5>Categories: </h5>
        </div>
      </div>
    </section>
  )
}

export default GameInfo;