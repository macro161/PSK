import React from 'react';

const Stats = props => {
  return (
    <ul>
      {props.stats.map(stat => {
        return <li key={stat}>{stat}</li>;
      })}
    </ul>
  );
};

export default Stats;

