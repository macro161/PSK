import * as utils from '../utils/api/office'

export const getOffices = () => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    utils.getAllOfficesHttp()
      .then(function(response){
        if(response.responseCode != 200){
          alert("As tikrai gausiu dusimtini")
        }

        dispatch({
          type: 'GET_OFFICES',
          offices: response.responseValue,
        });
        dispatch({ type: 'SET_LOADING', value: false });
      })
  }
  
  export const registerOffice = (city, address, aptAddress, aptSize)=> dispatch=>{
    dispatch({ type: 'SET_LOADING', value: true });
    utils.registerOfficeHttp({city, address, aptAddress, aptSize})
    .then(function(response){
      registerRooms(response.responseValue.id, aptSize)})
    .then(function (response) { 
      dispatch({
        type: "ADD_OFFICE",
        office: {city, address, aptAddress, aptSize}
    });
       dispatch({ type: 'SET_LOADING', value: false });
    })
  }
  
  export const registerRooms = (id, rooms)=> {
    var i;
    for(i =0;i<rooms;i++) 
      utils.registerRoomHttp(id,i)
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

  export const editOffice = (id,city,address,aptAddress,aptSize) => dispatch =>{
    dispatch({ type: 'SET_LOADING', value: true });
    utils.updateOffice({id,city, address, aptAddress,aptSize})
      .then(function(response){
        if(response.responseCode != 200){
          alert("100 proc nebus alerto")
        }
        else{
          dispatch({
            type:"EDIT_OFFICE",
            office:{
              id: id,
              city: city,
              address: address,
              aptAddress: aptAddress,
              aptSize: aptSize,
            }
          })
        }
       dispatch({ type: 'SET_LOADING', value: false });
      })
  
  }
