import * as utils from '../utils/api/userManager'

export const getAllEmployees = () => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true });
  utils.getAllEmployeesHttp()
    .then(function (response) {
      if (response.responseCode != 200) {
        alert("error, wrong response code")
      }
      dispatch({
        type: 'GET_ALL_EMPLOYEES',
        employees: response.responseValue,
      });
      dispatch({ type: 'SET_LOADING', value: false });
    });
};
export const removeUser = (Id) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true });
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
      dispatch({ type: 'SET_LOADING', value: false });
    });
};
export const updateUser = (Id) => {
  return {
    type: 'REMOVE_USER',
    Id: Id,
  }
};
export const registerUser = (fullName, office, email, password) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true });
  utils.registerEmployeeHttp({ fullName, office, email, password })
    .then(function (response) {
      dispatch({
        type: 'ADD_USER',
        user: response.responseValue
      });
      dispatch({ type: 'SET_LOADING', value: false });
    });
};