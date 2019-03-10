import React from 'react';

const Stats = props => {
  return (
    <ul>
      {props.map(stat => {
        return <li key={stat}>{stat}</li>;
      })}
    </ul>
  );
};

export default Stats;

