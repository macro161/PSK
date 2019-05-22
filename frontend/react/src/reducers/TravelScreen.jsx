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
        case 'DELETE_TRIP':
                const list = Array.from(state.trips)
                const ind = list.findIndex(i => i.tripId === action.id)
                list.splice(ind, 1)
                return {
                    ...state, trips: list
            }
        case 'EDIT_TRIP':
                const updatedTrips = state.trips.map(trip => {
                    if(trip.tripId === action.trip.tripId){
                      return action.trip
                    }
                    return trip
                  })
                  return {...state, trips: updatedTrips}
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

            return {
                ...state, trips: state.trips.map(trip => trip.tripId === action.et.tripId ?
                    {
                        ...trip, employeeTrips: trip.employeeTrips.map(et => et.employeeId === action.et.employeeId ?
                            { ...et, tripChecklist: { ...et.tripChecklist, plainTickets: 2 } } : et)
                    } : trip)
            }
        }
        case 'ADD_HOTEL_TO_ET': {

            return {
                ...state, trips: state.trips.map(trip => trip.tripId === action.et.tripId ?
                    {
                        ...trip, employeeTrips: trip.employeeTrips.map(et => et.employeeId === action.et.employeeId ?
                            { ...et, tripChecklist: { ...et.tripChecklist, apartments: 2 } } : et)
                    } : trip)
            }
            }
        case 'ADD_CAR_TO_ET': {

            return {
                ...state, trips: state.trips.map(trip => trip.tripId === action.et.tripId ?
                    {
                        ...trip, employeeTrips: trip.employeeTrips.map(et => et.employeeId === action.et.employeeId ?
                            { ...et, tripChecklist: { ...et.tripChecklist, car: 2 } } : et)
                    } : trip)
            }
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
