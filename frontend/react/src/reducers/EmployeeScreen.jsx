const initialState = {
    travels: [],
};

export default(state = initialState, action) => {
    switch(action.type){
        case 'GET_TRAVELS_BY_ID':
            return{
                ...state, travels: action.travels.filter(travel => travel.id === action.id)
            };
    }
}