const initialState = {
    trips: [],
    employeeTrips: [],
    employeeTrip: {},
    calendar: [],
};

export default(state = initialState, action) => {
    switch(action.type){
        case 'GET_EMPLOYEE_TRIPS_BASIC':
            return {
                ... state, employeeTrips: action.employeeTrips
            }
        case 'ADD_EMPLOYEE_TRIPS_BASIC': {
            return {
                ...state, trips : [...state.trips, action.employeeTrip]
            }
        }
        case 'GET_CALENDAR': {
            return {
                ...state, calendar : action.calendar
            }
        }
        case 'ADD_FLIGHT_TO_ET': {
            return { ...state, trips: state.trips.map(et => et.id === action.et ? { ...et, tripChecklist : { ...tripChecklist, plainTickets : 2 } } : et)}
            }
        case 'APPROVE_TRAVEL':
            return {...state, travels: state.travels.map(travel => travel.id === action.Id ? {...travel, approved: true} : travel)}
        case 'CANCEL_TRAVEL':
            return { ...state, travels: state.travels.map(travel => travel.id === action.Id ? { ...travel, approved: false } : travel) }
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
