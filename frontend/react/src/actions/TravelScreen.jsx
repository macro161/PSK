import * as utils from '../utils/api/organiser'

export const removeTrip = (id) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.deleteTripHttp(id)
        .then(function (response) {
            dispatch({ type: "DELETE_TRIP", id });
            dispatch({ type: 'SET_LOADING', value: false });   
        })
};

export const editTravel = (trip, departureDate, returnDate) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.editTripHttp(trip.tripId, departureDate, returnDate, trip.version)
        .then(function (response) {
            if (response.responseValue == 500) {
                alert("The trip has been changed by other user.")
            }
            else if (response.responseValue == true) {
                var edited = trip;
                edited.version = version;
                edited.returningDate = returnDate;
                edited.leavingDate = departureDate;
                dispatch({ type: "EDIT_TRAVEL", trip: edited });
            }
        dispatch({ type: 'SET_LOADING', value: false });
    })
   
}
export const registerTravel = (organiser, employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.registerTripHttp({ organiser: organiser, from_office: fromOffice.id, to_office: toOffice.id, leaving_date: leavingDate, returning_date: returningDate })
        .then(function (response) {
            utils.registerEmployeeTripHttp({ employee: employee.id, trip: response.responseValue.id, trip_checklist: tripChecklist, approved: false })
                .then(function (r) {
                    dispatch({ type: 'ADD_EMPLOYEE_TRIPS_BASIC', employeeTrip: r.responseValue });
                    dispatch({ type: 'SET_LOADING', value: false });
                });
        });
}

export const getAllEmployeeTrips = () => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.getBasicTripsHttp()
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("As tikrai gausiu dusimtini")
            }
            dispatch({
                type: 'GET_EMPLOYEE_TRIPS_BASIC',
                employeeTrips: response.responseValue,
            });
            dispatch({ type: 'SET_LOADING', value: false });
        })
}

export const addFlight = (et, flight) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.addFlightHttp(et, flight)
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("As tikrai gausiu dusimtini")
            }
            dispatch({
                type: 'ADD_FLIGHT_TO_ET',
                et: et,
            });
            dispatch({ type: 'SET_LOADING', value: false });
        })
}


export const addCar = (et, car) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.addCarHttp(et, car)
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("As tikrai gausiu dusimtini")
            }
            dispatch({
                type: 'ADD_CAR_TO_ET',
                et: et,
            });
            dispatch({ type: 'SET_LOADING', value: false });
        })
}
export const addHotel = (et, hotel) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.addHotelHttp(et, hotel)
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("As tikrai gausiu dusimtini")
            }
            dispatch({
                type: 'ADD_HOTEL_TO_ET',
                et: et,
            });
            dispatch({ type: 'SET_LOADING', value: false });
        })
}
export const getAllTrips = () => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.getTripsHttp()
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("Somethign wrong")
            }
            dispatch({
                type: 'GET_TRIPS',
                trips: response.responseValue,
            });
            dispatch({ type: 'SET_LOADING', value: false });
        })
}
export const groupTrips = (data) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.groupTripsHttp(data)
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("failed to group!")
            }
            dispatch({
                type: 'GET_TRIPS',
                trips: response.responseValue,
            });
            dispatch({ type: 'SET_LOADING', value: false });
    });
}
export const getEmployeeTrip = (tripId, employeeId) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.getEmployeeTripHttp(tripId, employeeId)
        .then(function (response) {
            dispatch({ type: 'GET_EMPLOYEE_TRIP', employeeTrip: response.responseValue });
            dispatch({ type: 'SET_LOADING', value: false });

        })
   
}
export const getEmployeeCalendar = (email) => dispatch => {
    utils.getEmployeeEvents(email)
        .then(function (response) {
            dispatch({ type: 'GET_CALENDAR', calendar: response.responseValue })
        });
}
export const clearEmployeeTrip = () => dispatch => {
    dispatch({ type: 'GET_EMPLOYEE_TRIP', employeeTrip: {} });
}
