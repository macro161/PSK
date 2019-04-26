import { getAll, post, put, deleteById } from './http';
const organiserUrl = "http://localhost:8080/employeetrip/";
const tripUrl = "http://localhost:8080/trip/";

export function getBasicTripsHttp(){
let responseCode;
return getAll(organiserUrl + "basic")
    .then(function (response) {
        console.log(response)
        responseCode = response.status;
        if(responseCode === 200){
            return response.json();
        }
    })
    .then(function (responseValue){
        return {
            responseCode,
            responseValue
        };
    });
}
export function registerTripHttp(trip){
    let responseCode;
    return post(tripUrl + "add", trip)
        .then(function(response){
            responseCode = response.status;
            if(responseCode === 200){
                return response.json();
            }
        })
        .then(function(responseValue){
            return {
                responseCode,
                responseValue
            };
        });
}

export function registerEmployeeTripHttp(empTrip){
    let responseCode;
    return post(organiserUrl + "add", empTrip)
        .then(function(response){
            responseCode = response.status;
            if(responseCode === 200){
                return response.json();
            }
        })
        .then(function(responseValue){
            return {
                responseCode,
                responseValue
            };
        });
}