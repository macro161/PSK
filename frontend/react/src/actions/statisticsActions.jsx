import axios from 'axios';
export const FETCH_STATS_STARTS = 'FETCH_STATS_STARTS';
export const RECEIVE_STATS = 'RECEIVE_STATS';

export const getStats = () => {
    const dogs = axios.get('https://dog.ceo/api/breeds/list/all');
    return dispatch => {
        dispatch({ type: FETCH_STATS_STARTS });
        dogs
          .then(({ data }) => {
            dispatch({ type: RECEIVE_STATS, payload: data.message });
          })
      };
};