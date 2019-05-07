import { getAll, getById } from './http';
const statsUrl = "http://localhost:8080/statistics/";

export function getStatsHttp(){
    let responseCode;
    return getAll(statsUrl)
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

export function getStatsByIdHttp(){
    let responseCode;
    return getById(statsUrl)
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