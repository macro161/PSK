

const initialState = {
    offices: [],
};

export default (state= initialState, action) => {
    switch (action.type){
        case "GET_OFFICES":
        return {
            ...state, offices: action.offices,
        }
        case "ADD_OFFICE":
        return {
            ...state, offices: [...state.offices, action.office]
        }
        case "EDIT_OFFICE":
        const offices = state.offices
        const index = offices.findIndex(i => i.id === action.office.id)
        offices.splice(index, 1, action.office)
        return {
            ...state, offices: offices
        }
        case "DELETE_OFFICE":
        const list = Array.from(state.offices)
        const ind = list.findIndex(i => i.id === action.id)
        list.splice(ind, 1)
        console.log(list,state.offices)
        return {
            ...state, offices: list
        }
        

        default:
        return state;
    }
}