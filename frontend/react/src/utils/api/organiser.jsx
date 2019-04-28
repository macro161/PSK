import { getAll, post, put, deleteById } from './http';
const organiserUrl = "http://localhost:8080/employeetrip/";
const tripUrl = "http://localhost:8080/trip/";

export function getBasicTripsHttp() {
    let responseCode;
    return getAll(organiserUrl + "basic")
        .then(function (response) {
            console.log(response)
            responseCode = response.status;
            if (responseCode === 200) {
                return response.json();
            }
        })
        .then(function (responseValue) {
            return {
                responseCode,
                responseValue
            };
        });
}
export function registerTripHttp(trip) {
    let responseCode;
    return post(tripUrl + "add", trip)
        .then(function (response) {
            responseCode = response.status;
            if (responseCode === 200) {
                return response.json();
            }
        })
        .then(function (responseValue) {
            return {
                responseCode,
                responseValue
            };
        });
}

export function registerEmployeeTripHttp(empTrip) {
    let responseCode;
    return post(organiserUrl + "add", empTrip)
        .then(function (response) {
            responseCode = response.status;
            if (responseCode === 200) {
                return response.json();
            }
        })
        .then(function (responseValue) {
            return {
                responseCode,
                responseValue
            };
        });
}

export function addHotelHttp(et, hotel) {
    let responseCode;
    return post(organiserUrl + "add/" + et.employeeId + "/" + et.tripId + "/hotel", hotel)
        .then(function (response) {
            responseCode = response.status;
            if (responseCode === 200) {
                return response;
            }
        })
        .then(function (responseValue) {
            return {
                responseCode,
                responseValue
            };
        });
}
export function addApartmentsHttp(et, apartments) {
    let responseCode;
    return post(organiserUrl + "add/" + et.employeeId + "/" + et.tripId+ "/apartments", apartments)
        .then(function (response) {
            responseCode = response.status;
            if (responseCode === 200) {
                return response;
            }
        })
        .then(function (responseValue) {
            return {
                responseCode,
                responseValue
            };
        });
}
export function addFlightHttp(et, flight) {
    let responseCode;
    return post(organiserUrl + "add/" + et.employeeId + "/" + et.tripId+ "/flight", flight)
        .then(function (response) {
            responseCode = response.status;
            if (responseCode === 200) {
                return response;
            }
        })
        .then(function (responseValue) {
            return {
                responseCode,
                responseValue
            };
        });
}
export function addCarHttp(et, car) {
    let responseCode;
    return post(organiserUrl + "add/" + et.employeeId + "/" + et.tripId + "/car", car)
        .then(function (response) {
            responseCode = response.status;
            if (responseCode === 200) {
                return response;
            }
        })
        .then(function (responseValue) {
            return {
                responseCode,
                responseValue
            };
        });
}

export function groupTripsHttp(trips, trip) {
    let responseCode;
    return post(organiserUrl + "group/", { trips_to_group: trips, trip: trip })
    .then(function (response){
        responseCode = response.status;
        if (responseCode === 200) {
            return response.json();
        }
    })
    .then (function(responseValue){
        return {
            responseCode,
            responseValue
        };
    });
}
export function getTripsHttp(){
    let responseCode;
    return getAll(organiserUrl + "trips")
        .then(function (response) {
        responseCode = response.status;
            if (responseCode === 200) {
                return response.json();
        }
        })
        .then(function (responseValue) {
        return {
            responseCode,
            responseValue
        }
    })
}