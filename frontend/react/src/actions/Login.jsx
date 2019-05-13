import { Log, Out } from '../utils/api/login';
import { getUserInfo } from '../utils/api/user';
import { history } from '../store';

export const Login = (email, password) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true });
  Log(email, password)
    .then(function (response) {
      if (response.responseCode == 200) {
        dispatch({ type: 'LOGIN_SUCCESS', role: response.responseValue.role});
      } else {
        dispatch({ type: 'LOGIN_ERROR', code: response.responseCode });
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
}

export const Logout = () => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true })
  Out()
  .then(response => {
    if (response.responseCode == 200) {
      dispatch({ type: 'LOGOUT_SUCCESS' })
    } else {
      dispatch({ type: 'LOGOUT_ERROR', code: response.responseCode })
    }
    dispatch({ type: 'SET_LOADING', value: false });
  })
}
export const GetMeAdmin = () => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true });
  getUserInfo()
    .then((response) => {
      if (response.responseCode === 401) {
        history.push('');
      }
      if (response.responseCode == 200 && response.responseValue.role != "ADMIN") {
        alert("You have no right to go to this page")
        history.push('');
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
}

export const GetMeOrganiser = () => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true });
  getUserInfo()
    .then((response) => {
      if (response.responseCode === 401) {
        history.push('');
      }
      if (response.responseCode == 200 && response.responseValue.role != "ORGANISER") {
        alert("You have no right to go to this page")
        history.push('');
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
}

export const GetMe = () => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true });
  getUserInfo()
    .then((response) => {
      if (response.responseCode === 401){
        history.push('');
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
}