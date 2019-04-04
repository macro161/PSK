import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DataTable from './EmployeesDataTable';
import * as actions from '../../actions/UserManager';
import UserRegistrationForm from './UserRegisterForm';
import Button from '@material-ui/core/Button';



const initialState = {
  showRegistration : false,
  changeUserInformation :false,
  email : '',
  fullName : '',
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

  editEmployee(id, fullName, city, email) {
    this.setState({
      id: id,
      fullName : fullName,
      city : city,
      email: email,
      showForm: true,
      editSite: true,
    });
  }
  onSubmit(fullName, city, email, password) {
    const userExists = () => {
      const { employees } = this.props;
      for (const employee of employees) {
        if (employee.email == email) {
          return true;
        }
      }
      return false;
    }
    this.setState({
      email: email,
      fullName : fullName,
      city: city,
    });
    const { employees } = this.props;
    if (this.state.changeUserInformation) {
      this.props.updateUser(fullName);
    }
    else {
      if (userExists()) {
        alert('That employee is already registered');
      } else {
        this.props.registerUser(fullName, city, email, password);
      }
    }
    this.setState(initialState);
  }

  render() {
    return (

      <div className='page-frame'>
        <title>User Manager</title>
        <br />
        {this.state.showRegistration ? <UserRegistrationForm  fullName = {this.state.fullName} city={this.state.city} email={this.state.email} onClose={this.onClose.bind(this)} onSubmit={this.onSubmit.bind(this)} /> : null}
        <Button disabled={this.state.showRegistration} onClick={this.registerUser.bind(this)} className="register-user-button" variant="contained" color="secondary">
            <div className ='bigger-font'>Register user</div>
        </Button>
        <hr />
        <DataTable
            disableButtons ={this.state.showRegistration}
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
  (state) => ({employees: state.UserManager.employees}),
  (dispatch) => bindActionCreators(
    {
      getAllEmployees: actions.getAllEmployees,
      removeUser: actions.removeUser,
      updateUser: actions.updateUser,
      registerUser: actions.registerUser,
  }, dispatch))(UserManager);

UserManager.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    fullName : PropTypes.string,
    city: PropTypes.string,
    email: PropTypes.string,
  })),
  getAllEmployees: PropTypes.func,
  removeUser: PropTypes.func,
  updateUser: PropTypes.func,
  registerUser: PropTypes.func,
};