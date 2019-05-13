const initialState = {
  success: null,
  errorCode: null,
  role: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        success: true,
        errorCode: null,
        role: action.role
      };
    }
    case 'LOGIN_ERROR': {
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
