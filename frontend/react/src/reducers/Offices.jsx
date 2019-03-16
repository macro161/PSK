

const initialState = {
    offices: [],
};

export default (state= initialState, action) => {
    switch (action.type){
        case "GET_OFFICES":
        return {
            ...state, offices: action.offices,
        };
        case "ADD_OFFICE":
        return {
            ...state, offices: [...state.offices, action.office]
        }
        case "EDIT_OFFICE":
        return { 
            ...state, 
            offices: state.offices.map(
                (office, id) => id === action.id ? {...office, city: action.city, address : action.address}
                                        : office
            )
         };
        default:
        return state;
    }
}