import { postForm } from './http'
const loginUrl = "http://localhost:8080/login"

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