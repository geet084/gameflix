import React from 'react';

export const GameInfo = (props) => {

  return (
    <section onClick={() => props.toggle(props.name)}>
      <h1>
        {props.name}
      </h1>
    </section>
  )
}

export default GameInfo;