import {FETCH_STATS_STARTS, RECEIVE_STATS} from '../actions/StatisticsScreen';

const initialState = {
    stats: {}
 };
 
 export default (state=initialState, action) =>{
    switch(action.type){
        case 'GET_STATS':
            return{
                ...state, stats: action.stats,
            };
        case 'GET_STAT_BY_NAME':
            return{
                ...state, stats: {
                    ...state.stats,
                    employeeTripQuantity: state.stats.employeeTripQuantity
                }
            };
        case 'GET_STAT_BY_DATE':
            return{
                ...state, stats: {
                    ...state.stats,
                    periodTripQuantity: state.stats.periodTripQuantity
                }
            };
        }
    return state
}