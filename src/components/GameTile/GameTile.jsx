import React from 'react';
import Icon from '../Icon/Icon';

function validateHasValue(props) {
  let updatedProps = { ...props }
  const values = ['min_players', 'max_players', 'max_playtime', 'average_user_rating'];

  values.forEach(key => {
    if (!updatedProps[key]) updatedProps[key] = 0;
  })
  return updatedProps;
}


export const GameTile = (props) => {
  const { images, name, min_playtime, toggle, handleFaves, id, fave } = props;
  const { min_players, max_players, max_playtime, average_user_rating } = validateHasValue(props);
  const maxNameLength = 27
  const style = { background: `url(${images.small}) no-repeat center` };

  const toggleFaves = (e) => {
    e.stopPropagation();
    handleFaves(id);
  }

  let shortName = '';
  name.split(' ').forEach(word => {
    if (`${shortName} ${word}`.length <= maxNameLength) shortName += ` ${word}`;
  })

  return (
    <section className="game" style={style} onClick={() => toggle(name)}>
      <h4 className="title">{name.length > maxNameLength ? `${shortName} ...` : name}</h4>
      <div className="btm-text">
        <p>
          <span> {min_players} - {max_players} <Icon type="users" /> </span>
          <span onClick={toggleFaves}>
            {fave ? <Icon type="tileFaveHeart" /> : <Icon type="tileHeart" />}
          </span>
        </p>
        <p>
          <span> <Icon type="clock" /> {min_playtime} - {max_playtime} </span>
          <span> {average_user_rating.toFixed(1)} <Icon type="star" /> </span>
        </p>
      </div>
    </section>
  )
}

export default GameTile;