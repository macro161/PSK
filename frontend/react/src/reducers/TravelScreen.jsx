const initialState = {
    travels: []
};

export default(state = initialState, action) => {
    switch(action.type){
        case 'GET_TRAVELS_BY_ID':
            return{
                ...state, travels: action.travels
            };
        case 'APPROVE_TRAVEL':
            return {...state, travels: state.travels.map(travel => travel.id === action.Id ? {...travel, approved: true} : travel)}
        case 'CANCEL_TRAVEL':
            return { ...state, travels: state.travels.map(travel => travel.id === action.Id ? { ...travel, approved: false } : travel) }
        case 'SET_LOADING':
            return {...state, loading: action.value};
        default: 
            return state;
    }
}