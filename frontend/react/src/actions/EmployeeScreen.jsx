export const getAllTravels = (userId) => dispatch => {
    let moc = [
        {
            id: '1',
            departureTime: '2018-01-01',
            accomodation: 'Vilnius chata',
            city: 'Vilnius'},
        {
            id: '1',
            departureTime: '2018-01-01',
            accomodation: 'Vilnius chata',
            city: 'Vilnius'
        }
    ]
    dispatch({
        type:'GET_TRAVELS_BY_ID',
        travels: moc,
        id: userId
    });
};