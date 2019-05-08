import { getAll, getById, getByParams } from './http';
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

export function getStatsByDateHttp(date, date2){
    let responseCode;
    return getByParams(statsUrl, date, date2)
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

export function getStatsByIdHttp(id){
    let responseCode;
    return getById(statsUrl, id)
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