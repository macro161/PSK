const initialState = {
   employees: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_EMPLOYEES':
      return {
        ...state, employees: action.employees,
      };
    case 'REMOVE_USER':
      return {
        ...state, employees: state.employees.filter(employee => employee.id != action.Id)
      };
    default:
      return state;
  }
}