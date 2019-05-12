import { postForm } from './http'
const loginUrl = "http://localhost:8080/login"
const logoutUrl = "http://localhost:8080/logout"

export function Log(email, password) {
  let responseCode;
  return postForm(loginUrl, { username: email, password: password })
    .then(function (response) {
      responseCode = response.status;
      if (responseCode != null) {
        return response;
      }
    })
    .then(function (responseValue) {
      return {
        responseCode,
        responseValue
      };
    });
}

export function Out() {
  return fetch(logoutUrl)
    .then((response) => {
      let responseCode = response.status;
      return { responseCode };
    })
}