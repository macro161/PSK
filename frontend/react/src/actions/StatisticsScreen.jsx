import axios from 'axios';
export const FETCH_STATS_STARTS = 'FETCH_STATS_STARTS';
export const RECEIVE_STATS = 'RECEIVE_STATS';
import * as utils from '../utils/api/statistics'

let staticStats = 
  [{
    mostTrips: 'Vilnius',
    mostExpensive: 'Vilnius-Kaunas',
    cheapest: 'Siauliai-Vilnius',
    shortest: 'Klaipeda-Vilnus',
    longest: 'Vilnius-Vilnius'
  }]

let statsByName = {
   name : 'Matas', travelCount : 10,
   name : 'Justas', travelCount :25
}

export const getStats = () => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true });
  utils.getStatsHttp()
    .then(function(response){
      if(response.responseCode != 200){
        alert("Geriau pakeisiu, kad nesuprastu, jog nukopinau")
      }

      dispatch({
        type: 'GET_STATS',
        stats: response.responseValue,
      });
      dispatch({ type: 'SET_LOADING', value: false });
    })
}

export const getStatsByName = (name) => {
  return dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: 'GET_STAT_BY_NAME', statsByName: statsByName, name: name });
    dispatch({ type: 'SET_LOADING', value: false });
  }
}


export const getStatsapi = () => {
  const dogs = axios.get('https://dog.ceo/api/breeds/list/all');
  return dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: FETCH_STATS_STARTS });
    dogs
      .then(({ data }) => {
        dispatch({ type: RECEIVE_STATS, payload: data.message });
      })
      dispatch({ type: 'SET_LOADING', value: false });
  };
};

/*export const getStats = () => {
  return dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: 'GET_STATS', stats: staticStats });
    dispatch({ type: 'SET_LOADING', value: false });
  }
}*/