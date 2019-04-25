import * as utils from '../utils/api/office'

export const getOffices = () => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.getAllOfficesHttp()
      .then(function(response){
        if(response.responseCode != 200){
          alert("As tikrai gausiu dusimtini")
        }
        console.log(response);
        dispatch({
          type: 'GET_OFFICES',
          offices: response.responseValue,
        });
        dispatch({ type: 'SET_LOADING', value: false });
      })
  }
  
export const registerOffice = (city, address) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
  utils.registerOfficeHttp({ city, address })
    .then(function (response) {
      dispatch({
        type: "ADD_OFFICE",
        office: response.responseValue
      })
      dispatch({ type: 'SET_LOADING', value: false });
    });
  }

export const deleteOffice = (id) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
  utils.removeOfficeHttp(id)
    .then(function (response) {
      if (response.responseCode != 200) {
        alert("Vel justas cia deda allert'a tai ir as pridesiu")
      }
      else {
        dispatch({
          type: "DELETE_OFFICE",
          id: id
        })
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
  }

export const editOffice = (id, city, address) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
  utils.updateOffice({ id, city, address })
    .then(function (response) {
      if (response.responseCode != 200) {
        alert("100 proc nebus alerto")
      }
      else {
        dispatch({
          type: "EDIT_OFFICE",
          office: {
            id: id,
            city: city,
            address: address,
          }
        })
      }
      dispatch({ type: 'SET_LOADING', value: false });
    });
  }
