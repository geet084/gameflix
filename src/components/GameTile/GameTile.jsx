import React from 'react';

function validateHasValue(props) {
  let updatedProps = { ...props }
  const values = [ 'min_players', 'max_players', 'max_playtime', 'average_user_rating'];

  values.forEach(key => {
    if (!updatedProps[key]) updatedProps[key] = 0;
  })
  return updatedProps;
}

export const GameTile = (props) => {
  const { images, name, min_age, min_playtime, toggle } = props;
  const { min_players, max_players, max_playtime, average_user_rating } = validateHasValue(props);
  const maxNameLength = 27
  const style = { background: `url(${images.small}) no-repeat center` };

  let shortName = '';
  name.split(' ').forEach(word => {
    if (`${shortName} ${word}`.length <= maxNameLength) shortName += ` ${word}`;
  })

  return (
    <section className="game" style={style} onClick={() => toggle(name)}>
      {<h4 className="title">{name.length > maxNameLength ? `${shortName} ...` : name}</h4>}
      <div className="btm-text">
        <p>
          <span> {min_players} - {max_players} <i className="fas fa-users"></i> </span>
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