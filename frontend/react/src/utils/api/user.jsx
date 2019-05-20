import { getAll, getById, put } from './http';
const userUrl = 'http://localhost:8080/user';
const userTripsUrl = 'http://localhost:8080/employeetrip';
const userId = 1735
const approveTripUrl = 'http://localhost:8080/employeetrip/approve/';
const declineTripUrl = 'http://localhost:8080/employeetrip/decline/';
const checklistUrl = 'http://localhost:8080/trip/checklist/update';

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
  return getAll(userUrl).then((response) => {
    responseCode = response.status;
    if (responseCode === 200) {
      return response.json();
    }
  }).then((responseValue)=>
  getById(userTripsUrl,responseValue.id).then((response) => {
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
  }))
}

export function approveTrip(tripId) {
  let responseCode;
  return getAll(userUrl).then((response) => {
    responseCode = response.status;
    if (responseCode === 200) {
      return response.json();
    }
  }).then((responseValue)=>
  put(approveTripUrl + responseValue.id +"/"+ tripId).then((response) => {
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
  }))
}

export function declineTrip(tripId) {
  let responseCode;
  return getAll(userUrl).then((response) => {
    responseCode = response.status;
    if (responseCode === 200) {
      return response.json();
    }
  }).then((responseValue)=>
  put(declineTripUrl + responseValue.id +"/"+ tripId).then((response) => {
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
  }))
}

export function updateTripChecklist(checklist) {
  let responseCode;
  return put(checklistUrl,checklist).then((response) => {
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