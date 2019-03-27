import * as utils from '../utils/api/userManager'

export const getAllEmployees = () => dispatch => {
  utils.getAllEmployeesHttp()
    .then(function (response) {
      if (response.responseCode != 200) {
        alert("error, wrong response code")
      }
      console.log(response);
      dispatch({
        type: 'GET_ALL_EMPLOYEES',
        employees: response.responseValue,
      });
    });
};
export const removeUser = (Id) => {
  return {
    type: 'REMOVE_USER',
    Id: Id,
  }
};
export const updateUser = (Id) => {
  return {
    type: 'REMOVE_USER',
    Id: Id,
  }
};
export const registerUser = (name, surname, city, email, password) => dispatch => {
  utils.registerEmployeeHttp({ name, surname, city, email, password })
    .then(function (response) {
      dispatch({
        type: 'ADD_USER',
        user: response.responseValue
      });
    });

};