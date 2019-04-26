import { getAll, post, put, deleteById } from './http';
const officeUrl = "http://localhost:8080/office/";

export function removeOfficeHttp(id){
    let responseCode;
    return deleteById(officeUrl, id)
        .then(function(response){
            responseCode = response.status;
            return response;
        })
        .then(function(responseValue){
            return {
                responseCode,
                responseValue,
            };
        });
}

export function getAllOfficesHttp(){
    let responseCode;
    return getAll(officeUrl)
        .then(function(response){
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

export function registerOfficeHttp(city, address, accommodation, rooms){
    let responseCode;
    return post(officeUrl + "add" + "?city=" +city +"&address=" +address +"&accommodation=" + accommodation + "&rooms=" +rooms)
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

export function updateOffice(office){
    let responseCode;
    return put(officeUrl + "edit/" + office.id, office)
        .then(function(response){
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

