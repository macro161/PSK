import {FETCH_STATS_STARTS, RECEIVE_STATS} from '../actions/StatisticsScreen';

const initialState = {
    fetching: false,
    fetched: false,
    stats: [],
    error: null
 };
 
 export default (state=initialState, action) =>{
    switch(action.type){
        case FETCH_STATS_STARTS:{
            return{...state, fetching: true}
        }
        case RECEIVE_STATS:{
            return{
                ...state,
                fetching: false,
                fetched: true,
                stats: action.payload
            }
        
        }
    }
    return state
}