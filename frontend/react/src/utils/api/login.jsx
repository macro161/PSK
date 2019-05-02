import { post } from './http'
const loginUrl = "http://localhost:8080/login"

export function Log(email, password) {
  post(loginUrl, { username: email, password: password })
    .then(function (response) {
      responseCode = response.status;
      if (responseCode != null) {
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