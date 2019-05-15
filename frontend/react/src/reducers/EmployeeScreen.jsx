const initialState = {
    travels: []
};

export default(state = initialState, action) => {
    switch(action.type){
        case 'GET_TRAVELS_BY_ID':
            return{
                ...state, travels: action.employeeTrips
            };
        case 'APPROVE_TRAVEL':
            return {...state, travels: state.travels.map(travel => travel.id.tripId === action.Id ? {...travel, approved: true} : travel)}
        default: 
            return state;
    }
}