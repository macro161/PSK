import React from 'react';
import TableRow from './EmployeesTableRow';
import PropTypes from 'prop-types';

export default class EmployeesDataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const employees = this.props.employees;
    const offices = this.props.offices;
    return (
      <table>
        <tbody>
          <tr>
            <th className="name">Full name</th>
            <th className="cityEmp">City</th>
            <th className="email">Email</th>
            <th className="role">Role</th>
            <th className="actions">Actions</th>
          </tr>
          {employees.map(employee => {
            return (
              <TableRow
                key={employee.id}
                Id={employee.id}
                fullName = {employee.fullName}
                email={employee.email}
                city={employee.office}
                role={employee.role.toLowerCase()}
                disableButtons={this.props.disableButtons}
                editEmployee={this.props.editEmployee}
                removeUser={this.props.removeUser}
                offices={this.props.offices}
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
    office: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.any,
  })),
  editEmployee: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  disableButtons: PropTypes.any,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    city: PropTypes.string,
    address: PropTypes.string
  }))
};