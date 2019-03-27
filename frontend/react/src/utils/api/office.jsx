import { getAll, post, put, deleteById } from './http';
const officeUrl = "http://localhost:8080/offices/";

export function removeOfficeHttp(id){}

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

export function registerOfficeHttp(office){}

export function updateOffice(office){}

