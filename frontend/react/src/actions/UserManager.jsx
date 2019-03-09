

export const getAllEmployees = () => dispatch => {
  let moc = [
    {
      id: '1',
      name: 'Justas',
      surname: 'Tvarijonas',
      city : 'Subačius',
      email: 'Tvarijonasjustas@gmail.com',
    },
    {
      id: '2',
      name: 'Matas',
      surname: 'Savickis',
      city : 'Šiauliai',
      email: 'Matas.savickis@mif.stud.vu.lt',
    }
  ]
  dispatch({
    type: 'GET_ALL_EMPLOYEES',
    employees: moc,
  });
};
export const removeUser = (Id) => {
  return {
    type: 'REMOVE_USER',
    Id: Id,
  }
};