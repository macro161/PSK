import * as utils from '../utils/api/organiser'
export const getAllTravels = (userId) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    let moc = [
        {
            id: '1',
            fullName: 'Tomas Balta',
            departureTime: '2018-01-01',
            accomodation: 'Vilnius chata',
            city: 'Vilnius',
            approved: true
        },
        {
            id: '2',
            fullName: 'Jonas Juoda',
            departureTime: '2018-01-02',
            accomodation: 'Vilnius chata',
            city: 'Vilnius',
            approved: false
        }
    ]
    dispatch({
        type: 'GET_TRAVELS',
        travels: moc,
    });
    dispatch({ type: 'SET_LOADING', value: false });
};

export const approveTravel = (travelId) => {
    return {
        type: 'APPROVE_TRAVEL',
        Id: travelId,
    }
};

export const cancelTravel = (travelId) => {
    return {
        type: 'CANCEL_TRAVEL',
        Id: travelId,
    }
};

export const removeTravel = (travelId) => {
    return {
        type: 'REMOVE_TRAVEL',
        Id: travelId,
    }
};

export const editTravel = (id, fullName, departureTime, accomodation, city, approved) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({
        type: "EDIT_TRAVEL",
        travel: {
            id: id,
            fullName: fullName,
            departureTime: departureTime,
            accomodation: accomodation,
            city: city,
            approved: approved,
        }
    })
    dispatch({ type: 'SET_LOADING', value: false });
}
export const registerTravel = (employee, leavingDate, returningDate, fromOffice, toOffice, tripChecklist) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.registerTripHttp({ from_office: fromOffice.id, to_office: toOffice.id, leaving_date: leavingDate, returning_date: returningDate })
        .then(function (response) {
            utils.registerEmployeeTripHttp({ employee: employee.id, trip: response.responseValue.id, trip_checklist: tripChecklist, approved: false })
                .then(function (r) {
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
            dispatch({ type: 'SET_LOADING', value: false });
            getAllTrips();
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