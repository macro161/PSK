import { getAll, post, put, deleteById } from './http';
const organiserUrl = "http://localhost:8080/employeetrip/";

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
