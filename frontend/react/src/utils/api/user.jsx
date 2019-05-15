import { getAll, getById } from './http';
const userUrl = 'http://localhost:8080/user';
const userTripsUrl = 'http://localhost:8080/employeetrip';
const userId = 1735

export function getUserInfo() {
  let responseCode;
  return getAll(userUrl).then((response) => {
    responseCode = response.status;
    if (responseCode === 200) {
      return response.json();
    }
  }).then((responseValue) => {
    console.log('t' + responseValue)
    return {
      responseCode,
      responseValue,
    };
  });
}

export function getUserTrips() {
  let responseCode;
  return getById(userTripsUrl,"1735").then((response) => {
    responseCode = response.status;
    if (responseCode === 200) {
      return response.json();
    }
  }).then((responseValue) => {
    console.log('t' + responseValue)
    return {
      responseCode,
      responseValue,
    };
  });
}