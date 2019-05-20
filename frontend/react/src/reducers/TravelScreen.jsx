const initialState = {
    trips: [],
    employeeTrips: [],
    employeeTrip: {},
};

export default(state = initialState, action) => {
    switch(action.type){
        case 'GET_EMPLOYEE_TRIPS_BASIC':
            return {
                ... state, employeeTrips: action.employeeTrips
            }
        case 'ADD_EMPLOYEE_TRIPS_BASIC': {
            return {
                ...state, employeeTrips : [...state.employeeTrips, action.employeeTrip]
            }
        }
        case 'ADD_FLIGHT_TO_ET': {
            return { ...state, employeeTrips: state.employeeTrips.map(et => et.id === action.et ? { ...et, tripChecklist : { ...tripChecklist, plainTickets : 2 } } : et)}
            }
        case 'SET_LOADING':
            return { ...state, loading: action.value };
        case 'GET_TRIPS':
            return { ...state, trips: action.trips }
        case 'GET_EMPLOYEE_TRIP':
            return {...state, employeeTrip:action.employeeTrip}
        default: 
            return state;
    }
}
