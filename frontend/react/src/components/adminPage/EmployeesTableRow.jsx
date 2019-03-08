import React from 'react';
import PropTypes from 'prop-types';

export default class EmployeesTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.deleteThis = this.deleteThis.bind(this);
    this.editThis = this.editThis.bind(this);
  }
  deleteThis() {
    
  }
  editThis() {
    
  }
  render() {
    return (
      <tr>
        <td className="name">{this.props.name}</td>
        <td className="surname">{this.props.surname}</td>
        <td className="city">{this.props.city}</td>
        <td className="email">{this.props.email}</td>
        <td className="actions"></td>
      </tr>
    );
  }
}


EmployeesTableRow.propTypes = {
  Id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  editEmployee: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};