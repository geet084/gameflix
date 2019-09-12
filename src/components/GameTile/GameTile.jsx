import React from 'react';

export const GameTile = (props) => {
  const { images, name, min_players, max_players, min_age, min_playtime, max_playtime, average_user_rating, toggle } = props;
  const maxNameLength = 31

  let shortName = '';
  name.split(' ').forEach(word => {
    if (`${shortName} ${word}`.length <= maxNameLength) shortName += ` ${word}`;
  })

  return (
    <section className="game" style={{ background: `url(${images.small}) no-repeat center` }} onClick={() => toggle(name)}>
      {<h4 className="title">{name.length > maxNameLength ? `${shortName} ...` : name}</h4>}
      <div className="info">
        <p>
          <span> &nbsp;{min_players} - {max_players} <i className="fas fa-users"></i> </span>
          <span> {min_age}+&nbsp; </span>
        </p>
        <p>
          <span> <i className="far fa-clock"></i> {min_playtime} - {max_playtime} </span>
          <span> {average_user_rating.toFixed(1)}<i className="fas fa-star"></i> </span>
        </p>
      </div>
    </section>
  )
}

export default GameTile;