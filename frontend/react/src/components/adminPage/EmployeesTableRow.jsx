import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

export default class EmployeesTableRow extends React.Component {
  constructor(props) {
    super(props);
  }
  deleteThis() {
    this.props.removeUser(this.props.Id);
  }
  editThis() {
    this.props.editEmployee(this.props.Id, this.props.name, this.props.surname, this.props.city, this.props.email);
  }
  render() {
    return (
      <tr>
        <td className="name">{this.props.name}</td>
        <td className="surname">{this.props.surname}</td>
        <td className="city">{this.props.city}</td>
        <td className="email">{this.props.email}</td>
        <td className="actions">
        <IconButton aria-label="Edit" color="primary" onClick = {this.editThis.bind(this)} disabled = {this.props.disableButtons}>
        <EditIcon />
      </IconButton>
        <IconButton aria-label="Delete" color="secondary" onClick = {this.deleteThis.bind(this)} disabled = {this.props.disableButtons}>
        <DeleteIcon />
      </IconButton>
        </td>
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