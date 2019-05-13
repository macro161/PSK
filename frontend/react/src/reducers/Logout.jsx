const initialState = {
  success: null,
  errorCode: null,
};
  
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        success: true,
        errorCode: null,
      };
    }
    case 'LOGOUT_ERROR': {
      return {
        ...state,
        success: false,
        errorCode: action.code,
      };
    }
    default:
      return state;
  }
}
  