const initialState = {
    count: 0
  };

const number = (state = initialState,action) => {
    switch(action.type){
        case 'INC_NUMB':
        return {
            count: state.count + 1
        }
        default:
            return state;
    }

}

export default number