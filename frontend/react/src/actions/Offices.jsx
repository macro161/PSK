import * as utils from '../utils/api/office'

export const getOffices = () => dispatch => {
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
      })
  }
  
  export const registerOffice = (id, city, address)=> dispatch=>{
      dispatch({
          type: "ADD_OFFICE",
          office:{
              id:id,
              city: city,
              address: address,
          }
      })
  }

  export const deleteOffice = (id) => dispatch=>{
    dispatch({
      type:"DELETE_OFFICE",
      id: id
    })
  }

  export const editOffice = (id, city, address) => dispatch=>{
    dispatch({
      type:"EDIT_OFFICE",
      office:{
        id: id,
        city: city,
        address: address,
      }
    })
  }
