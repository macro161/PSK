const initialState = {
  userInfo: null,
};
  
export default (state = initialState, action) => {
  switch (action.type) {  
    case 'GET_USER_INFO_SUCCESS': {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case 'RESET_USER_INFO': {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}; 