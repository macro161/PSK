import { Log } from '../utils/api/login';
import { getUserInfo } from '../utils/api/user';
import { history } from '../store';

export const Login = (email, password) => dispatch => {
  dispatch({ type: 'SET_LOADING', value: true });
  Log(email, password)
    .then(function (response) {
      console.log(response)
      if (response.responseCode == 200) {
        dispatch({ type: 'LOGIN_SUCCESS' });
      } else {
        dispatch({ type: 'LOGIN_ERROR', code: response.responseCode });
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
}

export const GetMe = () => (dispatch) => {
  dispatch({ type: 'SET_LOADING', value: true });
  getUserInfo()
    .then((response) => {
      console.log(response)
      if (response.responseCode === 401){
        history.push('login');
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
}