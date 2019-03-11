import axios from 'axios';
export const FETCH_STATS_STARTS = 'FETCH_STATS_STARTS';
export const RECEIVE_STATS = 'RECEIVE_STATS';

let staticStats = 
  [{
    mostTrips: 'Vilnius',
    mostExpensive: 'Vilnius-Kaunas',
    cheapest: 'Siauliai-Vilnius',
    shortest: 'Klaipeda-Vilnus',
    longest: 'Vilnius-Vilnius'
  }]

let statsByName = [
  { name : 'Matas', travelCount : 10},
  { name : 'Justas', travelCount :25}
]

export const getStatsByName = (name) => {
  return dispatch => {
    dispatch({ type: 'GET_STAT_BY_NAME', statsByName: statsByName, name: name});
  }
}


export const getStatsapi = () => {
  const dogs = axios.get('https://dog.ceo/api/breeds/list/all');
  return dispatch => {
    dispatch({ type: FETCH_STATS_STARTS });
    dogs
      .then(({ data }) => {
        dispatch({ type: RECEIVE_STATS, payload: data.message });
      })
  };
};

export const getStats = () => {
  return dispatch => {
    dispatch({ type: 'GET_STATS', stats: staticStats });
  }
}