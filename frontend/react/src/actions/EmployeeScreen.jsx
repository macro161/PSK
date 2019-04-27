export const getAllTravels = (userId) => dispatch => {
    dispatch({ type: 'SET_LOADING', value: true });
    let moc = [
        {
            id: '1',
            departureTime: '2018-01-01',
            accomodation: 'Vilnius chata',
            city: 'Vilnius',
            approved: true
        },
        {
            id: '2',
            departureTime: '2018-01-02',
            accomodation: 'Vilnius chata',
            city: 'Vilnius',
            approved: false
        }
    ]
    dispatch({
        type:'GET_TRAVELS_BY_ID',
        travels: moc,
        id: userId
    });
    dispatch({ type: 'SET_LOADING', value: false });
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
}
