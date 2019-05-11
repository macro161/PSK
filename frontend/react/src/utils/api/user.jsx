import { getAll } from './http';
const userUrl = 'http://localhost:8080/user';

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