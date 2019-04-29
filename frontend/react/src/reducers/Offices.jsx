

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
        const updatedOffices = state.offices.map(office => {
            if(office.id === action.office.id){
              return action.office 
            }
            return office
          })
          return {...state, offices: updatedOffices}
    
        case "DELETE_OFFICE":
        const list = Array.from(state.offices)
        const ind = list.findIndex(i => i.id === action.id)
        list.splice(ind, 1)
        return {
            ...state, offices: list
        }
        

        default:
        return state;
    }
}