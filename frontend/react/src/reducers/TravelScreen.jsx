const initialState = {
    travels: [],
    employeeTrips : [],
};

export default(state = initialState, action) => {
    switch(action.type){
        case 'GET_TRAVELS_BY_ID':
            return{
                ...state, travels: action.travels
            };
        case 'GET_EMPLOYEE_TRIPS_BASIC':
            return {
                ... state, employeeTrips: action.employeeTrips
            }
        case 'APPROVE_TRAVEL':
            return {...state, travels: state.travels.map(travel => travel.id === action.Id ? {...travel, approved: true} : travel)}
        case 'CANCEL_TRAVEL':
            return {...state, travels: state.travels.map(travel => travel.id === action.Id ? {...travel, approved: false} : travel)}
        default: 
            return state;
    }
}