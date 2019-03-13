import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';


export default class UserRegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      surname: this.props.surname,
      city: this.props.city,
      email: this.props.Contactemail,
      password1: "",
      password2: "",
      onClose: this.props.onClose,
      error: false,
    };
    
  }

  inputChange(e) {
    console.log(e.target.id + " " + e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit() {
    console.log(this.state.name + ' ' + this.state.surname + ' ' + this.state.email + ' ')
    this.setState({ error: false });
    this.state.password1 == this.state.password2 ?
      this.props.onSubmit(this.state.name, this.state.surname, this.state.city, this.state.email, this.state.password1)
      : this.setState({ error: true });
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <header className="form-header">
            <span className="form-header-text">Register new employee</span>
            <span className="form-header-close" onClick={this.props.onClose}>✖</span>
          </header>
          <div className="form-container">
            <TextField
              id="name"
              label="Name"
              className="form-text-field"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <TextField
              id="surname"
              label="Surname"
              className="form-text-field"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              id="city"
              label="City"
              className="form-text-field-city"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              id="email"
              label="Email address"
              className="form-text-field-email"
              type="text"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <TextField
              error={this.state.error}
              id="password1"
              name="password1"
              label="Password"
              className="form-text-field"
              type="password"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
              error={this.state.error}
              id="password2"
              name="password2"
              label="Repeat password"
              className="form-text-field"
              type="password"
              margin="normal"
              onChange={this.inputChange.bind(this)}
            />
            <div className="register-form-buttons">
            <Button variant="contained" size="large" color="primary" onClick={this.onSubmit.bind(this)}>
            Register
            </Button>
            <Button variant="contained" size="large" color="secondary" className="cancel-button" onClick={this.props.onClose}>
            Cancel
            </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserRegistrationForm.propTypes = {
  name: PropTypes.any,
  surname: PropTypes.any,
  city: PropTypes.any,
  email: PropTypes.any,
  onClose: PropTypes.any,
  onSubmit: PropTypes.any,
};

UserRegistrationForm.defaulProps = {
  name: '',
  surname: '',
  city: '',
  email: '',
};