import React from 'react';
import TableRow from './EmployeesTableRow';
import PropTypes from 'prop-types';

export default class EmployeesDataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const employees = this.props.employees;
    return (
      <table>
        <tbody>
          <tr>
            <th className="name">Full name</th>
            <th className="cityEmp">City</th>
            <th className="email">Email</th>
            <th className="actions">Actions</th>
          </tr>
          {employees.map(employee => {
            return (
              <TableRow
                key={employee.id}
                Id={employee.id}
                fullName = {employee.fullName}
                email={employee.email}
                city={employee.city}
                disableButtons={this.props.disableButtons}
                editEmployee={this.props.editEmployee}
                removeUser={this.props.removeUser}
              />);
        })}
        </tbody>
      </table >
    );
  }
}

EmployeesDataTable.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    fullName: PropTypes.any,
    city: PropTypes.string,
    email: PropTypes.string,
  })),
  editEmployee: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  disableButtons: PropTypes.any,
};