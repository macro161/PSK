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
  
  export const registerOffice = (city, address, accommodation, rooms)=> dispatch=>{
      utils.registerOfficeHttp(city, address, accommodation, rooms)
        .then(function (response){
          dispatch({
            type: "ADD_OFFICE",
            office: response.responseValue
        })
      })
  }

  export const deleteOffice = (id) => dispatch=>{
    utils.removeOfficeHttp(id)
      .then(function(response){
        if(response.responseCode != 200){
          alert("Vel justas cia deda allert'a tai ir as pridesiu")
        }
        else{
          dispatch({
            type:"DELETE_OFFICE",
            id: id
        })}
      })
    
  }

  export const editOffice = (id,city) => dispatch =>{
    utils.updateOffice({id,city})
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
              accommodation: accommodation,
              rooms: rooms,
            }
          })
        }
      })
    

  }
