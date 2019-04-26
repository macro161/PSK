import * as utils from '../utils/api/organiser'
export const getAllTravels = (userId) => dispatch => {
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
}

export const registerTravel = (id, fullName, departureTime, accomodation, city, approved) => dispatch => {
    dispatch({
        type: "ADD_TRAVEL",
        travel: {
            id: id,
            fullName: fullName,
            departureTime: departureTime,
            accomodation: accomodation,
            city: city,
            approved: approved,
        }
    })
}

export const getAllEmployeeTrips = () => dispatch => {
    utils.getBasicTripsHttp()
        .then(function (response) {
            if (response.responseCode != 200) {
                alert("As tikrai gausiu dusimtini")
            }
            console.log(response);
            dispatch({
                type: 'GET_EMPLOYEE_TRIPS_BASIC',
                employeeTrips: response.responseValue,
            });
        })
}