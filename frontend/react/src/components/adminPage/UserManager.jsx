import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DataTable from './EmployeesDataTable';
import * as actions from '../../actions/UserManager';

const initialState = {
  showRegistration : false,
  changeUserInformation :false,
  email : '',
  name : '',
  surname : '',
  city : '',
};
class UserManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.props.getAllEmployees();
  }

  registerUser() {
    this.setState({
      showRegistration: true,
    });
  }

  onClose() {
    this.setState(initialState);
  }

  editEmployee(id, name, surname, city, email) {
    this.setState({
      id: id,
      name: name,
      surname: surname,
      city : city,
      email: email,
      showForm: true,
      editSite: true,
    });
  }

  render() {
    return (
      <div className='page-frame'>
        <title>User Manager</title>
        <br />
        <DataTable
            employees={this.props.employees}
            editEmployee={this.editEmployee.bind(this)}
            disable={this.state.showRegistration}
            removeUser={this.props.removeUser}
          />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    employees: state.UserManager.employees
  }),
  (dispatch) => bindActionCreators({
    getAllEmployees: actions.getAllEmployees,
    removeUser: actions.removeUser,
  }, dispatch))(UserManager);

UserManager.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
  })),
  getAllEmployees: PropTypes.func,
  removeUser: PropTypes.func,
};