  export const getOffices = () => dispatch => {
    
    const testData = [
        {id:"100", city:"Vilnius", address:"135 Zalgirio g., Vilnius, LT-08217, Lithuania"},
        {id: "101", city:"Kaunas", address:"11d. Juozapaviciaus pr., Kaunas, LT-45252, Lithuania"},
      ];
    dispatch({
      type: 'GET_OFFICES',
      offices: testData,
    });
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
