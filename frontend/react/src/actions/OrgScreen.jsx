export const getAllTravels = (userId) => dispatch => {
    let moc = [
        {
            id: '1',
            name: 'Tomas',
            surname: 'Balta',
            departureTime: '2018-01-01',
            accomodation: 'Vilnius chata',
            city: 'Vilnius',
            approved: true
        },
        {
            id: '2',
            name: 'Jonas',
            surname: 'Juoda',
            departureTime: '2018-01-02',
            accomodation: 'Vilnius chata',
            city: 'Vilnius',
            approved: false
        }
    ]
    dispatch({
        type:'GET_TRAVELS_BY_ID',
        travels: moc,
        //id: userId
    });
};

export const approveTravel = (travelId) =>{
    return {
        type: 'APPROVE_TRAVEL',
        Id: travelId,
    }
};

export const cancelTravel = (travelId) => {
    return {
        type: 'CANCEL_TRAVEL',
        Id: travelId,
    }
};

export const removeTravel = (travelId) => {
    return {
        type: 'REMOVE_TRAVEL',
        Id: travelId,
    }
};

export const editTravel = (id, name, surname, departureTime, accomodation, city, approved) => dispatch=>{
    dispatch({
        type:"EDIT_TRAVEL",
        travel:{
            id: id,
            name: name,
            surname: surname,
            departureTime: departureTime,
            accomodation: accomodation,
            city: city,
            approved: approved,
        }
    })
}
  
export const registerTravel = (id, name, surname, departureTime, accomodation, city, approved)=> dispatch=>{
    dispatch({
        type: "ADD_TRAVEL",
        travel:{
            id: id,
            name: name,
            surname: surname,
            departureTime: departureTime,
            accomodation: accomodation,
            city: city,
            approved: approved,
        }
    })
}