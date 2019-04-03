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
export const removeUser = (Id) => dispatch => {
  utils.removeEmployeeHttp(Id)
    .then(function (response) {
      if (response.responseCode != 200) {
        alert("Something wrong in delete")
      }
      else {
        dispatch({
          type: 'REMOVE_USER',
          Id: Id,
        });
      }
    });
};
export const updateUser = (Id) => {
  return {
    type: 'REMOVE_USER',
    Id: Id,
  }
};
export const registerUser = (fullName, city, email, password) => dispatch => {
  utils.registerEmployeeHttp({ fullName, city, email, password })
    .then(function (response) {
      dispatch({
        type: 'ADD_USER',
        user: response.responseValue
      });
    });

};