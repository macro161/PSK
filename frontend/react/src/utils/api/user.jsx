import { getAll, getById } from './http';
const userUrl = 'http://localhost:8080/user';
const userTripsUrl = 'http://localhost:8080/employeetrip/employees';
const userId = "1656"

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
  return getById(userTripsUrl,userId).then((response) => {
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