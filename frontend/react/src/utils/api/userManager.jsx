import { getAll, post, put, deleteById } from './http';
const userManagerUrl = "http://localhost:8080/employee/";

export function removeEmployee(id) {
  let responseCode;
  return deleteById(userManagerUrl, id)
    .then(function (response) {
      responseCode = response.status;
      if (responseCode !== 204) {
        return response.json();
      }
    })
    .then(function (responseValue) {
      return {
        responseCode,
        responseValue,
      };
    });
}

export function getAllEmplyees() {
  let responseCode;
  return getAll(userManagerUrl)
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
export function registerEmployee(employee) {
  let responseCode;
  return post(userManagerUrl + "register", employee)
    .then(function (response) {
      responseCode = response.status;
      if (responseCode === 201) {
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
export function registerEmployee(employee) {
  let responseCode;
  return put(userManagerUrl + "update", employee)
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